import { UserWordInfo } from "@/types/userWordInfo";

export function getLetterPairsObj(letters: string) {
    const obj: {[key: string]: UserWordInfo} = {}
    
    for (const first of letters) {
        for (const second of letters) {
            obj[first + second] = {
                letter_pair: first + second,
                words: [],
            }
        }
    }
    
    return obj
}
