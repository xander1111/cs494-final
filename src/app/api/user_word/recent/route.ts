import { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server"

export async function GET(req: NextRequest) {
    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const recent = await supabase
        .from('user_word')
        .select('*', { count: 'exact' })
        .eq('user_uuid', user.data.user.id)
        .gt('time_added', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

    if (recent.error) {
        return Response.json({ message: "An error occured while retreiving data from the database", error: recent.error })
    }

    const overall = await supabase
        .from('user_word')
        .select('*', { count: 'exact' })
        .eq('user_uuid', user.data.user.id)

    if (overall.error) {
        return Response.json({ message: "An error occured while retreiving data from the database", error: recent.error })
    }

    return Response.json({ recent: recent.count, overall: overall.count })
}

