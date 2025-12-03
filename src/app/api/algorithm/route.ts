import { NextRequest } from "next/server"

import { createClient } from "@/utils/supabase/server"

import { Algorithm } from "@/types/algorithm"

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type")
    const buffer = req.nextUrl.searchParams.get("buffer")
    const target_a = req.nextUrl.searchParams.get("target_a")
    const target_b = req.nextUrl.searchParams.get("target_b")

    if (!type || !buffer || !target_a || !target_b) {
        return Response.json({ message: "HTTP query missing one of the following search parameters: type, buffer, target_a, target_b" })
    }

    const supabase = await createClient()
    const res = await supabase
        .from('cases')
        .select(`
            id,
            buffer,
            target_a,
            target_b,
            algorithms ( id, algorithm, type )
        `)
        .eq("buffer", buffer)
        .eq("target_a", target_a)
        .eq("target_b", target_b)
        .eq("algorithms.type", type)

    if (res.error) {
        return Response.json({ message: "An error occured while retreiving data from the database", error: res.error })
    }

    if (res.data.length === 0) {
        return Response.json({ algorithms: [] as Algorithm[] })
    }

    return Response.json({ algorithms: res.data[0].algorithms as Algorithm[] })
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    const alg = data.algorithm as Algorithm

    if (!alg) {
        return Response.json({ message: "No algorithm provided" })
    }
    if (!alg.case) {
        return Response.json({ message: "algorithm.case must be defined" })
    }

    const validAlg = /^[RUFLDBMESrufldbmeswxyz\'\[\]\(\)\:\,\s\d]+$/.test(alg.algorithm)

    if (!validAlg) {
        return Response.json({ message: "Invalid algorithm notation" })
    }

    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
        return Response.json({ message: "Must be logged in" })
    }

    let caseId = alg.case.id

    if (!caseId) {
        const res = await supabase
            .from('cases')
            .insert(alg.case)
            .select()

        if (res.error) {
            return Response.json({ message: `An error occured while creating case ${alg.case} in the database`, error: res.error })
        }

        caseId = res.data[0].id as number
    }

    const res = await supabase
        .from('algorithms')
        .insert({
            algorithm: alg.algorithm,
            type: alg.type,
            case_id: caseId
        })
        .select()

    if (res.error) {
        return Response.json({ message: "An error occured while creating case in the database", error: res.error })
    }

    return Response.json({ message: "Success", algorithm: res.data[0] as Algorithm })

    // TODO also mark this algorithm as learned
    // TODO also mark this algorithm as used
}
