'use client'

import { useState, useEffect } from "react";

import { CircularProgress, List, MenuItem, Stack, Typography } from "@mui/material";

import { edgeCategories } from "@/utils/categoryUtils";
import { UserCaseInfo } from "@/types/userCaseInfo";

import StyledTextField from "@/components/styledTextField";
import StyledSelect from "@/components/styledSelect";
import { CaseCard } from "@/components/caseCard";
import { StatsCard } from "@/components/statsCard";
import { StatLine } from "@/components/statLine";
import { CategoryChip } from "@/components/categoryChip";


export default function Home() {
    const [userCaseInfos, setUserCaseInfos] = useState<UserCaseInfo[] | undefined>()

    const [filter, setFilter] = useState<string | undefined>()
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filteredUserCaseInfos, setFilteredUserCaseInfos] = useState<UserCaseInfo[] | undefined>(userCaseInfos)

    const [sortBy, setSortBy] = useState<string>("alphabetical")
    const [ascending, setAscending] = useState<boolean>(false)

    useEffect(() => {
        async function filterWords() {
            let newFilteredCases = userCaseInfos ? [...userCaseInfos].filter(userCase =>
                userCase.target_a.toLowerCase().includes(searchTerm.toLowerCase()) ||
                userCase.target_b?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                userCase.algorithm.toLowerCase().includes(searchTerm.toLowerCase())
            ) : undefined

            if (newFilteredCases && filter)
                newFilteredCases = newFilteredCases.filter(userCase => userCase.category === filter)

            setFilteredUserCaseInfos(newFilteredCases)
        }

        filterWords()
    }, [userCaseInfos, searchTerm, filter])

    useEffect(() => {
        async function getCaseInfo() {
            const res = await fetch(`/api/user_case_info?type=edge`)
            const data = await res.json()

            setUserCaseInfos(data.userCaseInfos)
        }

        getCaseInfo()
    }, [])

    return (
        <Stack direction='row' width='80%' height='calc(100vh - 4rem)' justifyContent='space-evenly'>
            <Stack direction='column' gap={2} height='100%' width='40%' justifyContent='flex-start' pt={5} >
                <Stack direction='column' pl={1} pr={1} gap={2} width='100%' justifyContent='flex-start'>
                    <StyledTextField label="Search" type='search' onChange={e => { setSearchTerm(e.target.value) }} color='secondary' fullWidth />

                    <Stack direction='row' width='100%' justifyContent='space-between' >
                        <Stack direction='row'>
                            <Typography variant='cardSubheader'>Sort By:</Typography>
                            <StyledSelect
                                value={sortBy}
                                onChange={e => { setSortBy(e.target.value as string) }}
                                color='secondary'
                            >
                                <MenuItem value="alphabetical">Alphabetical</MenuItem>
                                <MenuItem value="learned">Learned</MenuItem>
                            </StyledSelect>
                            {/* TODO add up/down arrow to toggle ascending/descending */}
                        </Stack>
                        <Stack direction='row'>
                            {
                                filter ?
                                    <>
                                        <Typography variant='cardSubheader'>Filter:</Typography>
                                        <CategoryChip category={filter} setFilter={setFilter} removeFilter />
                                    </>
                                    :
                                    <>
                                        <Typography variant='cardSubheader'>Filter:</Typography>
                                        <Typography variant='cardSubheader'>None</Typography>
                                    </>
                            }
                        </Stack>
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
                        filteredUserCaseInfos ?
                            filteredUserCaseInfos.map(caseInfo => (
                                <CaseCard key={caseInfo.case_id} userCaseInfo={caseInfo} color='primary' setFilter={setFilter} />
                            ))
                            :
                            <CircularProgress color='primary' />
                    }
                </List>
            </Stack>

            <StatsCard type="Edge">
                {
                    Object.entries(edgeCategories).map((category, i) => (
                        <StatLine key={i} category={category[0]} type='corner' totalCases={category[1]} setFilter={category[0] === 'Total' ? undefined : setFilter} />
                    ))
                }
            </StatsCard>
        </Stack>
    );
}
