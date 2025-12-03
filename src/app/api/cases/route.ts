import { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server"

import { Case } from "@/types/case";

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type")
    if (!type) {
        return Response.json({ message: "HTTP query missing search parameter 'type'" })
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
                category
        `)
        .eq("type", type)

    if (res.error) {
        return Response.json({ message: "An error occured while retreiving data from the database", error: res.error })
    }

    return Response.json({ cases: res.data as Case[] })
}