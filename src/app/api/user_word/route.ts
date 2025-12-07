import { NextRequest } from "next/server"

import { createClient } from "@/utils/supabase/server"

import { Word } from "@/types/word"

export async function GET(req: NextRequest) {
    const letter_pair = req.nextUrl.searchParams.get("letter_pair")

    if (!letter_pair) {
        return Response.json({ message: "HTTP query missing search parameter 'letter_pair'" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from("user_word")
        .select(`
            id,
            user_uuid,
            words!inner ( id, letter_pair, word )
        `)
        .eq("user_uuid", user.data.user.id)
        .eq("words.letter_pair", letter_pair)
        .overrideTypes<Array<{
            id: number
            word_id: number
            user_uuid: string
            words: { id: number; word: string; letter_pair: string }
        }>>()

    if (res.error) {
        return Response.json({ message: "An error occured while retreiving data from the database", error: res.error })
    }

    if (res.data.length === 0) {
        return Response.json({ userWords: [] })
    }

    const userWords: Word[] = []

    for (const userWordData of res.data) {
        userWords.push({
            id: userWordData.words.id,
            word: userWordData.words.word,
            letter_pair: userWordData.words.letter_pair,
        })
}

return Response.json({ userWords: userWords })
}

export async function DELETE(req: NextRequest) {
    const data = await req.json()
    const userWordId = data.userWordId as number

    if (!userWordId) {
        return Response.json({ message: "No userWordId provided" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from('user_word')
        .delete()
        .eq("user_uuid", user.data.user.id)
        .eq("word_id", userWordId)
        .select()

    return Response.json({ message: "Success", rowsDeleted: res.data })
}


export async function POST(req: NextRequest) {
    const data = await req.json()
    const wordId = data.wordId as number

    if (!wordId) {
        return Response.json({ message: "No wordId provided" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from('user_word')
        .insert({
            user_uuid: user.data.user.id,
            word_id: wordId,
        })
        .select()

    if (res.error) {
        return Response.json({ message: "An error occured while creating user_algorithm in the database", error: res.error })
    }

    return Response.json({ message: "Success", userWordId: res.data[0].id })
}
