'use client'

import { useEffect, useState } from "react";

import { Checkbox, Collapse, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AddIcon from '@mui/icons-material/Add';

import { Algorithm } from "@/types/algorithm";

import StyledCard from "@/components/styledCard";
import StyledDivider from "@/components/styledDivider";
import StyledTextField from "@/components/styledTextField";

export function CaseCard(props: { type: string, case: string, algorithm: string, color: 'primary' | 'secondary' | 'error' | 'success' }) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [algorithms, setAlgorithms] = useState<Algorithm[]>([])

    useEffect(() => {
        fetch(`/api/algorithm?type=${props.type}&buffer=${'C'}&target_a=${props.case[0]}&target_b=${props.case[1]}`)
            .then(data => data.json())
            .then((data: { algorithms: Algorithm[] }) => { setAlgorithms(data.algorithms) })
    }, [])

    return (
        <StyledCard sx={{ width: '100%', mb: 2 }}>
            <Stack direction='column' spacing={2}>

                <Stack direction='row' justifyContent='space-between' spacing={2} width='100%' >
                    <Stack alignItems='flex-start'>
                        <Typography variant='cardHeader' color={props.color}>{props.case}</Typography>
                        {/* TODO add/display category chip */}
                        <Tooltip title="Edit algorithm">
                            <Typography
                                variant='cardSubheader'
                                color='common.black'
                                textAlign='center'
                                sx={{ cursor: 'pointer' }}
                                onClick={() => { setExpanded(!expanded) }}
                            >
                                {props.algorithm} <EditIcon sx={{ fontSize: 'inherit' }} />
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
                            <StyledTextField label="Add an algorithm" type='text' onChange={() => { }} color={props.color} />
                            <Tooltip title="Add algorithm">
                                <IconButton>
                                    <AddIcon color={props.color} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        {
                            algorithms.map((alg, i) => (
                                <Tooltip key={i} title="Click to select this algorithm">
                                    <Typography variant='cardSubheader'>{alg.algorithm}</Typography>
                                </Tooltip>
                            ))
                        }
                    </Stack>
                </Collapse>

            </Stack>
        </StyledCard>
    )
}
