'use client'

import { useEffect, useState } from "react";

import { Checkbox, CircularProgress, Collapse, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AddIcon from '@mui/icons-material/Add';

import { Algorithm } from "@/types/algorithm";
import { Case } from "@/types/case";

import StyledCard from "@/components/styledCard";
import StyledDivider from "@/components/styledDivider";
import StyledTextField from "@/components/styledTextField";

export function CaseCard(props: { type: string, case: Case, algorithmUsed: string, color: 'primary' | 'secondary' | 'error' | 'success' }) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [algorithms, setAlgorithms] = useState<Algorithm[] | undefined>()
    const [enteredAlg, setEnteredAlg] = useState<string>("")


    function loadAlgorithms() {
        if (!algorithms) {
            fetch(`/api/algorithm?type=${props.type}&buffer=${'C'}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
                .then(data => data.json())
                .then((data: { algorithms: Algorithm[] }) => { setAlgorithms(data.algorithms) })
        }
    }

    async function submitAlgorithm() {
        if (!enteredAlg)
            return

        const alg = {
            algorithm: enteredAlg,
            type: props.type,
            case: props.case
        } as Algorithm

        setEnteredAlg("")

        await fetch('/api/algorithm', {
            method: 'POST',
            body: JSON.stringify({ algorithm: alg })
        })

        const data = await fetch(`/api/algorithm?type=${props.type}&buffer=${'C'}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
        const newAlgs = await data.json() as { algorithms: Algorithm[] }
        setAlgorithms(newAlgs.algorithms)
    }

    return (
        <StyledCard sx={{ width: '100%', mb: 2 }}>
            <Stack direction='column' spacing={2}>

                <Stack direction='row' justifyContent='space-between' spacing={2} width='100%' >
                    <Stack alignItems='flex-start'>
                        <Typography variant='cardHeader' color={props.color}>{props.case.target_a}{props.case.target_b}</Typography>
                        {/* TODO add/display category chip */}
                        <Tooltip title="Edit algorithm">
                            <Typography
                                variant='cardSubheader'
                                color='common.black'
                                textAlign='center'
                                sx={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setExpanded(!expanded)
                                    loadAlgorithms()
                                }}
                            >
                                {props.algorithmUsed} <EditIcon sx={{ fontSize: 'inherit' }} />
                            </Typography>
                        </Tooltip>
                    </Stack>
                    <Stack spacing={0}>
                        <Tooltip title="Mark as learned">
                            <Checkbox color={props.color} icon={<SchoolOutlinedIcon />} checkedIcon={<SchoolIcon />} />
                        </Tooltip>
                    </Stack>
                </Stack>

                <Collapse in={expanded} timeout='auto' sx={{ width: '100%' }} unmountOnExit>
                    <Stack direction='column' spacing={2} width='100%'>
                        <StyledDivider />
                        <Stack direction='row' spacing={2}>
                            <StyledTextField label="Add an algorithm" type='text' value={enteredAlg} onChange={e => { setEnteredAlg(e.target.value) }} color={props.color} />
                            <Tooltip title="Add algorithm">
                                <IconButton onClick={submitAlgorithm}>
                                    <AddIcon color={props.color} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        {
                            algorithms ?
                                algorithms.map((alg, i) => (
                                    <Tooltip key={i} title="Click to select this algorithm">
                                        <Typography variant='cardSubheader'>{alg.algorithm}</Typography>
                                    </Tooltip>
                                ))
                                :
                                <CircularProgress color={props.color} />
                        }
                    </Stack>
                </Collapse>

            </Stack>
        </StyledCard>
    )
}
