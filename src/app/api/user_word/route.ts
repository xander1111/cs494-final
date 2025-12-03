import { NextRequest } from "next/server"

import { createClient } from "@/utils/supabase/server"

import { UserWord } from "@/types/userWord"
import { Word } from "@/types/word"

export async function GET(req: NextRequest) {
    const letter_pair = req.nextUrl.searchParams.get("letter_pair")

    if (!letter_pair) {
        return Response.json({ message: "HTTP query missing search parameter 'letter_pair'" })
    }

    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from("user_word")
        .select(`
            id,
            user_uuid,
            words!inner ( id, letter_pair, word )
        `)
        .eq("user_uuid", session.user.id)
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

    const userWords: UserWord[] = []

    for (const userWordData of res.data) {
        userWords.push({
            id: userWordData.id,
            user_uuid: userWordData.user_uuid,
            word: {
                id: userWordData.words.id,
                word: userWordData.words.word,
                letter_pair: userWordData.words.letter_pair,
            },
        })
    }

    return Response.json({ userWords: userWords })
}

export async function DELETE(req: NextRequest) {
    const data = await req.json()
    const userWord = data.userWord as UserWord

    if (!userWord) {
        return Response.json({ message: "No userWord provided" })
    }
    if (!userWord.id) {
        return Response.json({ message: "userWord has no id" })
    }

    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from('user_word')
        .delete()
        .eq("user_uuid", session.user.id)
        .eq("id", userWord.id)
        .eq("word_id", userWord.word.id)
        .select()

    return Response.json({ message: "Success", rowsDeleted: res.data })
}


export async function POST(req: NextRequest) {
    const data = await req.json()
    const userWord = data.userWord as UserWord

    if (!userWord) {
        return Response.json({ message: "No userWord provided" })
    }

    if (!userWord.word.id) {
        return Response.json({ message: "Word on userWord has no id" })
    }

    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user || !user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from('user_word')
        .insert({
            user_uuid: userWord.user_uuid,
            word_id: userWord.word.id
        })
        .select()

    if (res.error) {
        return Response.json({ message: "An error occured while creating user_algorithm in the database", error: res.error })
    }

    return Response.json({ message: "Success", userWord: res.data[0] as UserWord })
}
