'use client'

import { useState, useEffect } from "react";

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
            const res = await fetch(`/api/cases?type=edge`)
            const data = await res.json()

            setCases(data.cases)
        }

        getCases()
    }, [])

    return (
        <Stack direction='row' width='80%' height='calc(100vh - 4rem)' justifyContent='space-evenly'>
            <Stack direction='column' gap={2} height='100%' width='40%' justifyContent='flex-start' pt={5} >
                <Stack direction='row' pl={1} pr={1} gap={2} width='100%' justifyContent='flex-start'>
                    <StyledTextField label="Search" type='search' onChange={e => { setSearchTerm(e.target.value) }} color='primary' />

                    <Stack direction='row' >
                        <Typography variant='cardSubheader'>Sort By:</Typography>
                        <StyledSelect
                            value={sortBy}
                            onChange={e => { setSortBy(e.target.value as string) }}
                            color='primary'
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
                                <CaseCard key={i} case={cs} color='primary' />
                            ))
                            :
                            <CircularProgress color='primary' />
                    }
                </List>
            </Stack>
            <StatsCard type="Edge">
                {/* TODO get categories from DB */}
                <StatLine category="Total" numericCompletion="x/y" percentCompletion={60} color='error' />
                <StatLine category="4 Move" numericCompletion="x/y" percentCompletion={12} color='success' />
                <StatLine category="5 Move" numericCompletion="x/y" percentCompletion={34} color='success' />
                <StatLine category="M-Swap" numericCompletion="x/y" percentCompletion={56} color='secondary' />
                <StatLine category="U-Swap" numericCompletion="x/y" percentCompletion={78} color='secondary' />
                <StatLine category="E-Swap" numericCompletion="x/y" percentCompletion={90} color='secondary' />
                <StatLine category="S-Swap" numericCompletion="x/y" percentCompletion={12} color='secondary' />
                <StatLine category="F-Swap" numericCompletion="x/y" percentCompletion={23} color='secondary' />
                <StatLine category="D-Swap" numericCompletion="x/y" percentCompletion={34} color='secondary' />
                <StatLine category="S-Insert" numericCompletion="x/y" percentCompletion={45} color='secondary' />
                <StatLine category="Algorithm" numericCompletion="x/y" percentCompletion={56} color='primary' />
            </StatsCard>
        </Stack>
    );
}
