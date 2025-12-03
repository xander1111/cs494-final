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


export async function POST(req: NextRequest) {
    const data = await req.json()
    const word = data.word as Word

    if (!word) {
        return Response.json({ message: "No word provided" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from('words')
        .insert(word)
        .select()

    if (res.error) {
        return Response.json({ message: "An error occured while creating word in the database", error: res.error })
    }

    return Response.json({ message: "Success", word: res.data[0] as Word })

    // TODO also mark this word as used
}
