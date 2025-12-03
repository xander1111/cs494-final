import { NextRequest } from "next/server"

import { createClient } from "@/utils/supabase/server"

import { UserAlgorithm } from "@/types/userAlgorithm"
import { Algorithm } from "@/types/algorithm"
import { Case } from "@/types/case"

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type")
    const buffer = req.nextUrl.searchParams.get("buffer")
    const target_a = req.nextUrl.searchParams.get("target_a")
    const target_b = req.nextUrl.searchParams.get("target_b")

    if (!type || !buffer || !target_a || !target_b) {
        return Response.json({ message: "HTTP query missing one of the following search parameters: type, buffer, target_a, target_b" })
    }

    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from("algorithms")
        .select(`
            id,
            algorithm,
            type,
            cases!inner ( id, buffer, target_a, target_b ),
            user_algorithm!inner (
                id, alg_id, user_uuid
            )
        `)
        .eq("type", type)
        .eq("user_algorithm.user_uuid", session.user.id)
        .eq("cases.buffer", buffer)
        .eq("cases.target_a", target_a)
        .eq("cases.target_b", target_b)
        .limit(1, {referencedTable: 'cases'})
        .limit(1, {referencedTable: 'user_algorithm'})
        .limit(1)
        .overrideTypes<Array<{
            id: number
            algorithm: string
            type: string
            cases: { id: number; buffer: string; target_a: string; target_b: string }
            user_algorithm: Array<{ id: number; alg_id: string; user_uuid: string }>
        }>>()

    if (res.error) {
        return Response.json({ message: "An error occured while retreiving data from the database", error: res.error })
    }

    if (res.data.length === 0) {
        return Response.json({ userAlgorithm: {} })
    }

    const cs = {
        id: res.data[0].cases.id,
        buffer: res.data[0].cases.buffer,
        target_a: res.data[0].cases.target_a,
        target_b: res.data[0].cases.target_b,
    } as Case

    const alg = {
        id: res.data[0].id,
        algorithm: res.data[0].algorithm,
        type: res.data[0].type,
        case: cs,
    } as Algorithm

    const userAlg = {
        id: res.data[0].user_algorithm[0].id,
        alg: alg,
        user_uuid: res.data[0].user_algorithm[0].user_uuid,
    } as UserAlgorithm

    return Response.json({ userAlgorithm: userAlg })
}


export async function POST(req: NextRequest) {
    const data = await req.json()
    const userAlg = data.userAlgorithm as UserAlgorithm

    if (!userAlg) {
        return Response.json({ message: "No userAlgorithm provided" })
    }

    if (!userAlg.alg.id) {
        return Response.json({ message: "Algorithm on userAlgorithm has no id" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from('user_algorithm')
        .upsert({
            id: userAlg.id,
            user_uuid: userAlg.user_uuid,
            alg_id: userAlg.alg.id
        })
        .select()

    if (res.error) {
        return Response.json({ message: "An error occured while creating user_algorithm in the database", error: res.error })
    }

    return Response.json({ message: "Success", userAlgorithm: res.data[0] as UserAlgorithm })
}
