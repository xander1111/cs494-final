import { NextRequest } from "next/server"

import { createClient } from "@/utils/supabase/server"

import { Word } from "@/types/word"

export async function GET(req: NextRequest) {
    const letter_pair = req.nextUrl.searchParams.get("letter_pair")

    if (!letter_pair) {
        return Response.json({ message: "HTTP query missing search parameter 'letter_pair'" })
    }

    const supabase = await createClient()
    const res = await supabase
        .from("words")
        .select("*")
        .eq("letter_pair", letter_pair)

    return Response.json({ words: res.data as Word[] })
}
