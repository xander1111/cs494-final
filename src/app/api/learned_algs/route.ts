import { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server"

import { Case } from "@/types/case";

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
        .from('learned_algs')
        .select(`
                id,
                user_uuid,
                case_id,
                type,
                cases!inner ( id, buffer, target_a, target_b )
        `)
        .eq("user_uuid", user.data.user.id)
        .eq("type", type)
        .eq("cases.buffer", buffer)
        .eq("cases.target_a", target_a)
        .eq("cases.target_b", target_b)

    if (res.error) {
        return Response.json({ message: "An error occured while retreiving data from the database", error: res.error })
    }

    if (res.data.length === 0) {
        return Response.json({ learned: false })
    }

    return Response.json({ learned: true })  // If we got a row, then the algorithm is marked as learned
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    const type = data.type as string
    const cs = data.case as Case

    if (!type) {
        return Response.json({ message: "No type provided" })
    }
    if (!cs) {
        return Response.json({ message: "No case provided" })
    }
    if (!cs.id) {
        return Response.json({ message: "Case must have an id" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const findExisting = await supabase
        .from('learned_algs')
        .select(`
            id,
            user_uuid,
            case_id,
            type
        `)
        .eq("user_uuid", user.data.user.id)
        .eq("case_id", cs.id)
        .eq("type", type)

    if (findExisting.error) {
        return Response.json({ message: `An error occured while retrieving learned status of case ${cs.id}, type '${type}' in the database`, error: findExisting.error })
    }

    if (findExisting.data.length > 0) {
        return Response.json({ message: `Case ${cs.id}, type '${type}' already marked as learned` })
    }

    const res = await supabase
        .from('learned_algs')
        .insert({
            user_uuid: user.data.user.id,
            case_id: cs.id,
            type: type,
        })
        .select()

    if (res.error) {
        return Response.json({ message: `An error occured while adding learned status of case ${cs.id}, type '${type}' in the database`, error: res.error })
    }

    return Response.json({ message: "Success", learnedRow: res.data[0] })
}

export async function DELETE(req: NextRequest) {
    const data = await req.json()
    const type = data.type as string
    const cs = data.case as Case

    if (!type) {
        return Response.json({ message: "No type provided" })
    }
    if (!cs) {
        return Response.json({ message: "No case provided" })
    }
    if (!cs.id) {
        return Response.json({ message: "Case must have an id" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const findExisting = await supabase
        .from('learned_algs')
        .select(`
            id,
            user_uuid,
            case_id,
            type
        `)
        .eq("user_uuid", user.data.user.id)
        .eq("case_id", cs.id)
        .eq("type", type)

    if (findExisting.error) {
        return Response.json({ message: `An error occured while retrieving learned status of case ${cs.id}, type '${type}' in the database`, error: findExisting.error })
    }

    if (findExisting.data.length == 0) {
        return Response.json({ message: `Case ${cs.id}, type '${type}' already marked as not learned` })
    }

    const res = await supabase
        .from('learned_algs')
        .delete()
        .eq("user_uuid", user.data.user.id)
        .eq("id", findExisting.data[0].id)
        .eq("type", type)
        .select()

    if (res.error) {
        return Response.json({ message: `An error occured while adding learned status of case ${cs.id}, type '${type}' in the database`, error: res.error })
    }

    return Response.json({ message: "Success", rowsDeleted: res.data })
}
