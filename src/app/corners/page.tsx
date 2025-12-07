'use client'

import { useEffect, useState } from "react";

import { CircularProgress, List, MenuItem, Stack, Typography } from "@mui/material";

import { cornerCategories } from "@/utils/categoryUtils";
import { UserCaseInfo } from "@/types/userCaseInfo";

import StyledTextField from "@/components/styledTextField";
import StyledSelect from "@/components/styledSelect";
import { CaseCard } from "@/components/caseCard";
import { StatsCard } from "@/components/statsCard";
import { StatLine } from "@/components/statLine";


export default function Home() {
    const [userCaseInfos, setUserCaseInfos] = useState<UserCaseInfo[] | undefined>()

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filter, setFilter] = useState<string>("")
    const [sortBy, setSortBy] = useState<string>("alphabetical")
    const [ascending, setAscending] = useState<boolean>(false)

    useEffect(() => {
        async function getCaseInfo() {
            const res = await fetch(`/api/user_case_info?type=corner`)
            const data = await res.json()

            setUserCaseInfos(data.userCaseInfos)
        }

        getCaseInfo()
    }, [])

    return (
        <Stack direction='row' width='80%' height='calc(100vh - 4rem)' justifyContent='space-evenly'>
            <Stack direction='column' gap={2} height='100%' width='40%' justifyContent='flex-start' pt={5} >
                <Stack direction='row' pl={1} pr={1} gap={2} width='100%' justifyContent='flex-start'>
                    <StyledTextField label="Search" type='search' onChange={e => { setSearchTerm(e.target.value) }} color='secondary' />

                    <Stack direction='row' >
                        <Typography variant='cardSubheader'>Sort By:</Typography>
                        <StyledSelect
                            value={sortBy}
                            onChange={e => { setSortBy(e.target.value as string) }}
                            color='secondary'
                        >
                            <MenuItem value="alphabetical">Alphabetical</MenuItem>
                            <MenuItem value="learned">Learned</MenuItem>
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
                        userCaseInfos ?
                            userCaseInfos.map((caseInfo, i) => (
                                <CaseCard key={i} userCaseInfo={caseInfo} color='secondary' />
                            ))
                            :
                            <CircularProgress color='secondary' />
                    }
                </List>
            </Stack>

            <StatsCard type="Corner">
                {
                    Object.entries(cornerCategories).map((category, i) => (
                        <StatLine key={i} category={category[0]} numericCompletion={`x/${category[1]}`} percentCompletion={60} />
                    ))
                }
            </StatsCard>

        </Stack>
    );
}
