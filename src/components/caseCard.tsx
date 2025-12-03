'use client'

import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { Checkbox, CircularProgress, Collapse, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AddIcon from '@mui/icons-material/Add';

import { Algorithm } from "@/types/algorithm";
import { Case } from "@/types/case";

import { UserAlgorithm } from "@/types/userAlgorithm";
import { useUser } from "@/contexts/userContext";

import StyledCard from "@/components/styledCard";
import StyledDivider from "@/components/styledDivider";
import StyledTextField from "@/components/styledTextField";

export function CaseCard(props: { type: string, case: Case, color: 'primary' | 'secondary' | 'error' | 'success' }) {
    const user = useUser();

    const [expanded, setExpanded] = useState<boolean>(false);
    const [algorithms, setAlgorithms] = useState<Algorithm[] | undefined>()
    const [enteredAlg, setEnteredAlg] = useState<string>("")
    const [algorithmUsed, setAlgorithmUsed] = useState<Algorithm | undefined>()
    const [userAlg, setUserAlg] = useState<UserAlgorithm | undefined>()
    const [loadingAlgUsed, setLoadingAlgUsed] = useState<boolean>(true)

    const validInput = useMemo(() => /^[RUFLDBMESrufldbmeswxyz\'\[\]\(\)\:\,\s\d]+$/.test(enteredAlg) || enteredAlg.length == 0, [enteredAlg])
    const getHelperText = useMemo(() => (validInput ? "" : "Invalid algorithm notation"), [validInput])

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

        if (!validInput)
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

        const data = await fetch(`/api/algorithm?type=${props.type}&buffer=${props.case.buffer}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
        const newAlgs = await data.json() as { algorithms: Algorithm[] }
        setAlgorithms(newAlgs.algorithms)
    }

    async function setUsedAlg(usedAlg: Algorithm) {
        async function updateUsedAlgs() {
            setLoadingAlgUsed(true)
            const res = await fetch(`/api/user_algorithm?type=${props.type}&buffer=${props.case.buffer}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
            const data = await res.json()

            console.log(data)
            setUserAlg(data.userAlgorithm)
            setAlgorithmUsed(data.userAlgorithm.alg)
            setLoadingAlgUsed(false)
        }

        if (!user.user) {
            return
        }

        const newUserAlg = {
            id: userAlg?.id,
            alg: usedAlg,
            user_uuid: user.user.id
        } as UserAlgorithm

        const res = await fetch('/api/user_algorithm', {
            method: 'POST',
            body: JSON.stringify({ userAlgorithm: newUserAlg })
        })
        const data = await res.json()

        setUserAlg(data.userAlgorithm)
        updateUsedAlgs()
    }

    useEffect(() => {
        async function updateUsedAlgs() {
            setLoadingAlgUsed(true)
            const res = await fetch(`/api/user_algorithm?type=${props.type}&buffer=${props.case.buffer}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
            const data = await res.json()

            setUserAlg(data.userAlgorithm)
            setAlgorithmUsed(data.userAlgorithm.alg)
            setLoadingAlgUsed(false)
        }

        updateUsedAlgs()
    }, [])

    return (
        <StyledCard sx={{ width: '100%', mb: 2 }}>
            <Stack direction='column' spacing={2}>

                <Stack direction='row' justifyContent='space-between' spacing={2} width='100%' >
                    <Stack alignItems='flex-start'>
                        <Typography variant='cardHeader' color={props.color}>{props.case.target_a}{props.case.target_b}</Typography>
                        {/* TODO add/display category chip */}
                        {
                            loadingAlgUsed ?
                                <CircularProgress color={props.color} size='100%' sx={{ height: '100%', width: '100%' }} />
                                :
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
                                        {algorithmUsed?.algorithm ?? "No algorithm set"} <EditIcon sx={{ fontSize: 'inherit' }} />
                                    </Typography>
                                </Tooltip>
                        }

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
                            <StyledTextField
                                label="Add an algorithm"
                                type='text'
                                value={enteredAlg}
                                error={!validInput}
                                helperText={getHelperText}
                                onChange={e => { setEnteredAlg(e.target.value) }}
                                color={props.color}
                            />
                            <Tooltip title="Add algorithm">
                                <IconButton onClick={submitAlgorithm}>
                                    <AddIcon color={props.color} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        {
                            algorithms ?
                                algorithms.map((alg, i) => (
                                    <Tooltip key={i} title="Click to select this algorithm" onClick={() => { setUsedAlg(alg) }}>
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
