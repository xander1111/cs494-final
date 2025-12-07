import { createClient } from "@/utils/supabase/server"

import { UserWordInfo } from "@/types/userWordInfo";
import { Word } from "@/types/word";

import { getLetterPairsObj } from "@/utils/letterPairUtils";

export async function GET() {
    const supabase = await createClient()
    const user = await supabase.auth.getUser()
    if (!user.data.user) {
        return Response.json({ message: "Must be logged in" })
    }

    const res = await supabase
        .from('user_word')
        .select(`
            words ( letter_pair, word, id )
        `)
        .eq("user_uuid", user.data.user.id)
        .overrideTypes<Array<{words: Word}>>()

    if (res.error) {
        return Response.json({ message: "An error occured while fetching user case info in the database", error: res.error })
    }

    const wordInfos = getLetterPairsObj("ABCDEFGHIJKLMNOPQRSTUVWX")  // Just allowing speffz for now, may make this more flexible later

    for (const word of res.data) {
        wordInfos[word.words.letter_pair].words.push(word.words)
    }

    return Response.json({ message: "Success", userWordInfos: Object.values(wordInfos) as UserWordInfo[] })
}