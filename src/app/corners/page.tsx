'use client'

import { useEffect, useState } from "react";

import { CircularProgress, List, MenuItem, Stack, Tooltip, Typography } from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { cornerCategories } from "@/utils/categoryUtils";
import { UserCaseInfo } from "@/types/userCaseInfo";
import { Case } from "@/types/case";
import { useUser } from "@/contexts/userContext";

import StyledTextField from "@/components/styledTextField";
import StyledSelect from "@/components/styledSelect";
import { CaseCard } from "@/components/caseCard";
import { StatsCard } from "@/components/statsCard";
import { StatLine } from "@/components/statLine";
import { CategoryChip } from "@/components/categoryChip";


export default function Home() {
    const user = useUser()

    const [userCaseInfos, setUserCaseInfos] = useState<UserCaseInfo[] | undefined>()

    const [sortBy, setSortBy] = useState<string>("alphabetical")
    const [ascending, setAscending] = useState<boolean>(true)
    const [sortedUserCaseInfos, setSortedUserCaseInfos] = useState<UserCaseInfo[] | undefined>(userCaseInfos)

    const [filter, setFilter] = useState<string | undefined>()
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filteredUserCaseInfos, setFilteredUserCaseInfos] = useState<UserCaseInfo[] | undefined>(sortedUserCaseInfos)

    useEffect(() => {
        async function sortCases() {
            if (sortBy === 'alphabetical') {
                const newSortedCases = userCaseInfos ? [...userCaseInfos].sort(ascending ? (a, b) => (a.target_a + a.target_b).localeCompare(b.target_a + b.target_b) : (a, b) => (b.target_a + b.target_b).localeCompare(a.target_a + a.target_b)) : undefined
                setSortedUserCaseInfos(newSortedCases)
            } else if (sortBy === 'learned') {
                const newSortedCases = userCaseInfos ? [...userCaseInfos].sort(ascending ? (a, b) => (b.learned ? 1 : 0) - (a.learned ? 1 : 0) : (a, b) => (a.learned ? 1 : 0) - (b.learned ? 1 : 0)) : undefined
                setSortedUserCaseInfos(newSortedCases)
            }
        }

        sortCases()
    }, [userCaseInfos, sortBy, ascending])

    useEffect(() => {
        async function filterCases() {
            let newFilteredCases = sortedUserCaseInfos ? [...sortedUserCaseInfos].filter(userCase =>
                (userCase.target_a.toLowerCase() + userCase.target_b?.toLowerCase()).includes(searchTerm.toLowerCase()) ||
                userCase.algorithm?.toLowerCase().includes(searchTerm.toLowerCase())
            ) : undefined

            if (newFilteredCases && filter)
                newFilteredCases = newFilteredCases.filter(userCase => userCase.category === filter)

            setFilteredUserCaseInfos(newFilteredCases)
        }

        filterCases()
    }, [sortedUserCaseInfos, searchTerm, filter])

    useEffect(() => {
        async function getCaseInfo() {
            const res = await fetch(`/api/user_case_info?type=corner`)
            const data = await res.json()

            setUserCaseInfos(data.userCaseInfos)
        }

        async function getCases() {
            const res = await fetch(`/api/cases?type=corner`)
            const data = await res.json()
            const cases = data.cases as Case[]

            const caseInfos = cases.map((cs) => {
                return {
                    case_id: cs.id,
                    buffer: cs.buffer,
                    target_a: cs.target_a,
                    target_b: cs.target_b,
                    type: cs.type,
                    category: cs.category,
                } as UserCaseInfo
            })

            setUserCaseInfos(caseInfos)
        }

        if (user.user) {
            getCaseInfo()
        } else {
            getCases()
        }
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
                            <Tooltip title="Toggle ascending/descending" >
                                <ExpandMoreIcon
                                    sx={{ transform: ascending ? 'rotate(180deg)' : 'rotate(0deg)', cursor: 'pointer' }}
                                    onClick={() => { setAscending(!ascending) }}
                                />
                            </Tooltip>
                        </Stack>
                        <Stack direction='row'>
                            {
                                filter ?
                                    <>
                                        <Typography variant='cardSubheader'>Category Filter:</Typography>
                                        <CategoryChip category={filter} setFilter={setFilter} removeFilter />
                                    </>
                                    :
                                    <>
                                        <Typography variant='cardSubheader'>Category Filter:</Typography>
                                        <Tooltip title="Click a category to filter"><Typography variant='cardSubheader'>None</Typography></Tooltip>
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
                                <CaseCard key={caseInfo.case_id} userCaseInfo={caseInfo} color='secondary' setFilter={setFilter} />
                            ))
                            :
                            <CircularProgress color='secondary' />
                    }
                </List>
            </Stack>

            <StatsCard type="Corner">
                {
                    Object.entries(cornerCategories).map((category, i) => (
                        <StatLine key={i} category={category[0]} type='corner' totalCases={category[1]} setFilter={category[0] === 'Total' ? undefined : setFilter} />
                    ))
                }
            </StatsCard>
        </Stack>
    );
}
