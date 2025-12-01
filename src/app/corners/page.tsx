'use client'

import { useState } from "react";

import { List, MenuItem, Stack, Typography } from "@mui/material";


import StyledTextField from "@/components/styledTextField";
import StyledSelect from "@/components/styledSelect";
import { CaseCard } from "@/components/caseCard";
import { StatsCard } from "@/components/statsCard";
import { StatLine } from "@/components/statLine";


export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filter, setFilter] = useState<string>("")
    const [sortBy, setSortBy] = useState<string>("alphabetical")
    const [ascending, setAscending] = useState<boolean>(false)

    return (
        <Stack direction='row' width='80%' height='calc(100vh - 4rem)' justifyContent='space-evenly'>
            <Stack direction='column' gap={2} height='100%' width='40%' justifyContent='flex-start' pt={5} >
                <Stack direction='row' pl={1} pr={1} gap={2} width='100%' justifyContent='flex-start'>
                    <StyledTextField label="Search" type='search' onChange={e => { setSearchTerm(e.target.value) }} />

                    <Stack direction='row' >
                        <Typography variant='cardSubheader'>Sort By:</Typography>
                        <StyledSelect
                            value={sortBy}
                            onChange={e => { setSortBy(e.target.value as string) }}
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
                    <CaseCard case="AB" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="DG" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />

                    <CaseCard case="AB" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="DG" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="AB" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="DG" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="AB" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="DG" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="AB" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="DG" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="AB" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="DG" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="AB" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                    <CaseCard case="DG" algorithm="x' R' D R' U2 R D' R' U2 R2 x" color='secondary' />
                </List>
            </Stack>
            <StatsCard type="Corner">
                <StatLine category="Total" numericCompletion="x/y" percentCompletion={60} color='error'/>
                <StatLine category="U-Up, D-Side" numericCompletion="x/y" percentCompletion={12} color='success'/>
                <StatLine category="U-Up, D-Down" numericCompletion="x/y" percentCompletion={34} color='success'/>
                <StatLine category="D-Down, D-Down" numericCompletion="x/y" percentCompletion={56} color='success'/>
                <StatLine category="D-Side, D-Side" numericCompletion="x/y" percentCompletion={78} color='secondary'/>
                <StatLine category="LFU/BRU, D-Any" numericCompletion="x/y" percentCompletion={90} color='secondary'/>
                <StatLine category="U-Side, D-Any" numericCompletion="x/y" percentCompletion={12} color='secondary'/>
                <StatLine category="D-Side, D-Down" numericCompletion="x/y" percentCompletion={23} color='secondary'/>
                <StatLine category="U-Any, U-Any" numericCompletion="x/y" percentCompletion={34} color='primary'/>
                <StatLine category="Special" numericCompletion="x/y" percentCompletion={45} color='primary'/>
            </StatsCard>
        </Stack>
    );
}
