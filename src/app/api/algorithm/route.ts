import { NextRequest } from "next/server"

import { createClient } from "@/utils/supabase/server"

import { Algorithm } from "@/types/algorithm"

export async function GET(req: NextRequest) {
    const caseId = req.nextUrl.searchParams.get("case_id")

    if (!caseId) {
        return Response.json({ message: "HTTP query missing search parameter 'case_id'" })
    }

    const supabase = await createClient()
    const res = await supabase
        .from('cases')
        .select(`
            id,
            buffer,
            target_a,
            target_b,
            type,
            algorithms ( id, algorithm )
        `)
        .eq("id", caseId)

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
    if (!alg.caseId) {
        return Response.json({ message: "Algorithm must have a caseId" })
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

    const res = await supabase
        .from('algorithms')
        .insert({
            algorithm: alg.algorithm,
            case_id: alg.caseId
        })
        .select()

    if (res.error) {
        return Response.json({ message: "An error occured while creating case in the database", error: res.error })
    }

    return Response.json({ message: "Success", algorithm: res.data[0] as Algorithm })

    // TODO also mark this algorithm as learned
    // TODO also mark this algorithm as used
}
