'use client'

import { useEffect, useState } from "react";

import { CircularProgress, List, MenuItem, Stack, Typography } from "@mui/material";

import { UserWordInfo } from "@/types/userWordInfo";

import StyledTextField from "@/components/styledTextField";
import StyledSelect from "@/components/styledSelect";
import { LetterPairCard } from "@/components/letterPairCard";
import { StatsCard } from "@/components/statsCard";
import { StatLine } from "@/components/statLine";


export default function Home() {
    const [userWordInfos, setUserWordInfos] = useState<UserWordInfo[] | undefined>()

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [sortBy, setSortBy] = useState<string>("alphabetical")
    const [ascending, setAscending] = useState<boolean>(false)

    useEffect(() => {
        async function getWordInfo() {
            const res = await fetch(`/api/user_word_info`)
            const data = await res.json()

            setUserWordInfos(data.userWordInfos)
        }

        getWordInfo()
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
                            <MenuItem value="wordCount">Number of Words</MenuItem>
                        </StyledSelect>
                    </Stack>
                    {/* TODO Filter chip */}
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
                        userWordInfos ?
                            userWordInfos.map((wordInfo, i) => (
                                <LetterPairCard key={i} userWordInfo={wordInfo}  color='success' />
                            ))
                            :
                            <CircularProgress color='success' />
                    }
                </List>
            </Stack>
            <StatsCard type="Letter Pair">
                <StatLine nonPercent category='Total' type='letterPair' totalCases={24*24} />
            </StatsCard>
        </Stack>
    );
}
