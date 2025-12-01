import { NextRequest } from "next/server"

import { createClient } from "@/utils/supabase/server"

import { Algorithm } from "@/types/algorithm"

export async function GET(req: NextRequest) {
    const buffer = req.nextUrl.searchParams.get("buffer")
    const target_a = req.nextUrl.searchParams.get("target_a")
    const target_b = req.nextUrl.searchParams.get("target_b")

    if (!buffer || !target_a || !target_b) {
        return Response.json({ message: "HTTP query missing one of the following search parameters: buffer, target_a, target_b" })
    }

    const supabase = await createClient()
    const algorithm = await supabase
        .from("algorithms")
        .select("*")
        .eq("buffer", buffer)
        .eq("target_a", target_a)
        .eq("target_b", target_b)
        
    return Response.json({ algorithms: algorithm.data as Algorithm[] })
}
