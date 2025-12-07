import { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server"

import { UserCaseInfo } from "@/types/userCaseInfo";

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type")
    if (!type) {
        return Response.json({ message: "HTTP query missing search parameter 'type'" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .rpc('fetch_user_case_info', {
            search_type: type,
            search_user_uuid: user.data.user.id,
        })

    if (res.error) {
        return Response.json({ message: "An error occured while fetching user case info in the database", error: res.error })
    }

    return Response.json({ message: "Success", userCaseInfos: res.data as UserCaseInfo[] })
}