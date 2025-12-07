'use client'

import { useEffect, useState } from "react";

import { CircularProgress, List, MenuItem, Stack, Tooltip, Typography } from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { UserWordInfo } from "@/types/userWordInfo";
import { useUser } from "@/contexts/userContext";

import StyledTextField from "@/components/styledTextField";
import StyledSelect from "@/components/styledSelect";
import { LetterPairCard } from "@/components/letterPairCard";
import { StatsCard } from "@/components/statsCard";
import { StatLine } from "@/components/statLine";
import { getLetterPairsObj } from "@/utils/letterPairUtils";


export default function Home() {
    const user = useUser()

    const [userWordInfos, setUserWordInfos] = useState<UserWordInfo[] | undefined>()

    const [sortBy, setSortBy] = useState<string>("alphabetical")
    const [ascending, setAscending] = useState<boolean>(true)
    const [sortedUserWordInfos, setSortedUserWordInfos] = useState<UserWordInfo[] | undefined>(userWordInfos)

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filteredUserWordInfos, setFilteredUserWordInfos] = useState<UserWordInfo[] | undefined>(userWordInfos)

    useEffect(() => {
        async function sortCases() {
            if (sortBy === 'alphabetical') {
                const newSortedWords = userWordInfos ? [...userWordInfos].sort(ascending ? (a, b) => a.letter_pair.localeCompare(b.letter_pair) : (a, b) => b.letter_pair.localeCompare(a.letter_pair)) : undefined
                setSortedUserWordInfos(newSortedWords)
            } else if (sortBy === 'wordCount') {
                const newSortedWords = userWordInfos ? [...userWordInfos].sort(ascending ? (a, b) => a.words.length - b.words.length : (a, b) => b.words.length - a.words.length) : undefined
                setSortedUserWordInfos(newSortedWords)
            }
        }

        sortCases()
    }, [userWordInfos, sortBy, ascending])

    useEffect(() => {
        async function filterWords() {
            const newFilteredWords = sortedUserWordInfos ? [...sortedUserWordInfos].filter(userWord =>
                userWord.letter_pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
                userWord.words.map(word => word.word.toLowerCase().includes(searchTerm.toLowerCase())).reduce((prev, cur) => prev || cur, false)
            ) : undefined

            setFilteredUserWordInfos(newFilteredWords)
        }

        filterWords()
    }, [sortedUserWordInfos, searchTerm])

    useEffect(() => {
        async function getWordInfo() {
            const res = await fetch(`/api/user_word_info`)
            const data = await res.json()

            setUserWordInfos(data.userWordInfos)
        }

        async function getWords() {
            const words = getLetterPairsObj("ABCDEFGHIJKLMNOPQRSTUVWX")

            setUserWordInfos(Object.values(words))
        }

        if (user.user) {
            getWordInfo()
        } else {
            getWords()
        }
    }, [])

    return (
        <Stack direction='row' width='80%' height='calc(100vh - 4rem)' justifyContent='space-evenly'>
            <Stack direction='column' gap={2} height='100%' width='40%' justifyContent='flex-start' pt={5} >
                <Stack direction='row' pl={1} pr={1} gap={2} width='100%' justifyContent='flex-start'>
                    <StyledTextField label="Search" type='search' onChange={e => { setSearchTerm(e.target.value) }} color='success' />

                    <Stack direction='row' >
                        <Typography variant='cardSubheader'>Sort By:</Typography>
                        <StyledSelect
                            value={sortBy}
                            onChange={e => { setSortBy(e.target.value as string) }}
                            color='success'
                        >
                            <MenuItem value="alphabetical">Alphabetical</MenuItem>
                            {
                                user.user ?
                                    <MenuItem value="wordCount">Number of Words</MenuItem>
                                    :
                                    null
                            }
                        </StyledSelect>
                        <Tooltip title="Toggle ascending/descending" >
                            <ExpandMoreIcon
                                sx={{ transform: ascending ? 'rotate(180deg)' : 'rotate(0deg)', cursor: 'pointer' }}
                                onClick={() => { setAscending(!ascending) }}
                            />
                        </Tooltip>
                    </Stack>
                </Stack>
                <List
                    sx={{
                        maxHeight: '100%',
                        overflow: 'auto',
                        width: '100%',
                        pl: 1,
                        pr: 1,
                    }}
                >
                    {
                        filteredUserWordInfos ?
                            filteredUserWordInfos.map(wordInfo => (
                                <LetterPairCard key={wordInfo.letter_pair} userWordInfo={wordInfo} color='success' />
                            ))
                            :
                            <CircularProgress color='success' />
                    }
                </List>
            </Stack>
            <StatsCard type="Letter Pair">
                <StatLine nonPercent category='Total' type='letterPair' totalCases={24 * 24} />
            </StatsCard>
        </Stack>
    );
}
