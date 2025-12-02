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
        .from("algorithms")
        .select("*")
        .eq("type", type)
        .eq("buffer", buffer)
        .eq("target_a", target_a)
        .eq("target_b", target_b)

    return Response.json({ algorithms: res.data as Algorithm[] })
}
