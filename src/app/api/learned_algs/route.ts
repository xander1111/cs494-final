import { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server"

export async function GET(req: NextRequest) {
    const caseId = req.nextUrl.searchParams.get("case_id")

    if (!caseId) {
        return Response.json({ message: "HTTP query missing search parameter 'case_id'" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from('learned_algs')
        .select(`
                id,
                user_uuid,
                case_id,
                cases!inner ( id, buffer, target_a, target_b, type )
        `)
        .eq("user_uuid", user.data.user.id)
        .eq("cases.id", caseId)
        .overrideTypes<Array<{
            id: number,
            user_uuid: string,
            case_id: number,
            cases: { id: number, buffer: string, target_a: string, target_b: string, type: string }
        }>>()

    if (res.error) {
        return Response.json({ message: "An error occured while retreiving data from the database", error: res.error })
    }

    if (res.data.length === 0) {
        return Response.json({ learned: false })
    }

    return Response.json({ learned: true })
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    const caseId = data.case_id as number

    if (!caseId) {
        return Response.json({ message: "No case_id provided" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const findExisting = await supabase
        .from('learned_algs')
        .select(`
            id,
            user_uuid,
            case_id,
            cases!inner ( id, type )
        `)
        .eq("user_uuid", user.data.user.id)
        .eq("case_id", caseId)

    if (findExisting.error) {
        return Response.json({ message: `An error occured while retrieving learned status of case ${caseId} in the database`, error: findExisting.error })
    }

    if (findExisting.data.length > 0) {
        return Response.json({ message: `Case ${caseId} already marked as learned` })
    }

    const res = await supabase
        .from('learned_algs')
        .insert({
            user_uuid: user.data.user.id,
            case_id: caseId,
        })
        .select()

    if (res.error) {
        return Response.json({ message: `An error occured while adding learned status of case ${caseId} in the database`, error: res.error })
    }

    return Response.json({ message: "Success", learnedRow: res.data[0] })
}

export async function DELETE(req: NextRequest) {
    const data = await req.json()
    const caseId = data.case_id as number

    if (!caseId) {
        return Response.json({ message: "No case_id provided" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const findExisting = await supabase
        .from('learned_algs')
        .select(`
            id,
            user_uuid,
            case_id,
            cases!inner ( id, type )
        `)
        .eq("user_uuid", user.data.user.id)
        .eq("case_id", caseId)

    if (findExisting.error) {
        return Response.json({ message: `An error occured while retrieving learned status of case ${caseId} in the database`, error: findExisting.error })
    }

    if (findExisting.data.length == 0) {
        return Response.json({ message: `Case ${caseId} already marked as not learned` })
    }

    const res = await supabase
        .from('learned_algs')
        .delete()
        .eq("user_uuid", user.data.user.id)
        .eq("id", findExisting.data[0].id)
        .eq("case_id", caseId)
        .select()

    if (res.error) {
        return Response.json({ message: `An error occured while removing learned status of case ${caseId} in the database`, error: res.error })
    }

    return Response.json({ message: "Success", rowsDeleted: res.data })
}
