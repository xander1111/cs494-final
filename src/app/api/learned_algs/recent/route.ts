import { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server"

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type")
    const category = req.nextUrl.searchParams.get("category")

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    let query = supabase
            .from('learned_algs')
            .select(`
                *,
                cases!inner ( )
            `, { count: 'exact' })
            .eq('user_uuid', user.data.user.id)
            .gt('time_added', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

    if (type) {
        query = query.eq("cases.type", type)
    }
    if (category) {
        query = query.eq("cases.category", category)
    }

    const res = await query

    if (res.error) {
        return Response.json({ message: "An error occured while retreiving data from the database", error: res.error })
    }

    return Response.json({ count: res.count })
}

