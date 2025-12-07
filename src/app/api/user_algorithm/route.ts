import { NextRequest } from "next/server"

import { createClient } from "@/utils/supabase/server"

import { UserAlgorithm } from "@/types/userAlgorithm"

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type")
    const buffer = req.nextUrl.searchParams.get("buffer")
    const target_a = req.nextUrl.searchParams.get("target_a")
    const target_b = req.nextUrl.searchParams.get("target_b")

    if (!type || !buffer || !target_a || !target_b) {
        return Response.json({ message: "HTTP query missing one of the following search parameters: type, buffer, target_a, target_b" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from("algorithms")
        .select(`
            id,
            algorithm,
            cases!inner ( id, buffer, target_a, target_b, type ),
            user_algorithm!inner (
                id, alg_id, user_uuid
            )
        `)
        .eq("user_algorithm.user_uuid", user.data.user.id)
        .eq("cases.type", type)
        .eq("cases.buffer", buffer)
        .eq("cases.target_a", target_a)
        .eq("cases.target_b", target_b)
        .limit(1, {referencedTable: 'cases'})
        .limit(1, {referencedTable: 'user_algorithm'})
        .limit(1)
        .overrideTypes<Array<{
            id: number
            algorithm: string
            cases: { id: number; type: string; buffer: string; target_a: string; target_b: string }
            user_algorithm: Array<{ id: number; alg_id: string; user_uuid: string }>
        }>>()

    if (res.error) {
        return Response.json({ message: "An error occured while retreiving data from the database", error: res.error })
    }

    if (res.data.length === 0) {
        return Response.json({ userAlgorithm: {} })
    }

    // const cs = {
    //     id: res.data[0].cases.id,
    //     type: res.data[0].cases.type,
    //     buffer: res.data[0].cases.buffer,
    //     target_a: res.data[0].cases.target_a,
    //     target_b: res.data[0].cases.target_b,
    // } as Case

    // const alg = {
    //     id: res.data[0].id,
    //     algorithm: res.data[0].algorithm,
    //     case: cs,
    // } as Algorithm

    return Response.json({ userAlgorithm: res.data[0].algorithm })
}


export async function POST(req: NextRequest) {
    const data = await req.json()
    const userAlg = data.algorithm as {
        id?: number,
        algId: number,
    } as UserAlgorithm

    if (!userAlg) {
        return Response.json({ message: "No algorithm provided" })
    }

    if (!userAlg.algId) {
        return Response.json({ message: "Algorithm requires algId" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    console.log(`Upserting ID ${userAlg.id}`)

    const res = await supabase
        .from('user_algorithm')
        .upsert({
            id: userAlg.id,
            user_uuid: user.data.user.id,
            alg_id: userAlg.algId
        })
        .select()

    if (res.error) {
        return Response.json({ message: "An error occured while creating user_algorithm in the database", error: res.error })
    }

    return Response.json({ message: "Success", userAlgorithm: res.data[0] as UserAlgorithm })
}
