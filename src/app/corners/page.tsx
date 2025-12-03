'use client'

import { useEffect, useState } from "react";

import { CircularProgress, List, MenuItem, Stack, Typography } from "@mui/material";

import { Case } from "@/types/case";

import StyledTextField from "@/components/styledTextField";
import StyledSelect from "@/components/styledSelect";
import { CaseCard } from "@/components/caseCard";
import { StatsCard } from "@/components/statsCard";
import { StatLine } from "@/components/statLine";


export default function Home() {
    const [cases, setCases] = useState<Case[] | undefined>()

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filter, setFilter] = useState<string>("")
    const [sortBy, setSortBy] = useState<string>("alphabetical")
    const [ascending, setAscending] = useState<boolean>(false)

    useEffect(() => {
        async function getCases() {
            const res = await fetch(`/api/cases?type=corner`)
            const data = await res.json()

            setCases(data.cases)
        }

        getCases()
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
                        cases ? 
                            cases.map((cs, i) => (
                                <CaseCard key={i} case={cs} color='secondary' />
                            ))
                            :
                            <CircularProgress color='secondary' />
                    }
                </List>
            </Stack>

            <StatsCard type="Corner">
                {/* TODO get categories from util */}
                <StatLine category="Total" numericCompletion="x/y" percentCompletion={60} />
                <StatLine category="U-Up, D-Side" numericCompletion="x/y" percentCompletion={12} />
                <StatLine category="U-Up, D-Down" numericCompletion="x/y" percentCompletion={34} />
                <StatLine category="D-Down, D-Down" numericCompletion="x/y" percentCompletion={56} />
                <StatLine category="D-Side, D-Side" numericCompletion="x/y" percentCompletion={78} />
                <StatLine category="LFU/BRU, D-Any" numericCompletion="x/y" percentCompletion={90} />
                <StatLine category="U-Side, D-Any" numericCompletion="x/y" percentCompletion={12} />
                <StatLine category="D-Side, D-Down" numericCompletion="x/y" percentCompletion={23} />
                <StatLine category="U-Any, U-Any" numericCompletion="x/y" percentCompletion={34} />
                <StatLine category="Special" numericCompletion="x/y" percentCompletion={45} />
            </StatsCard>

        </Stack>
    );
}
