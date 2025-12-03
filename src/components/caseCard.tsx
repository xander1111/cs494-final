'use client'

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

export function CaseCard(props: { case: Case, color: 'primary' | 'secondary' | 'error' | 'success' }) {
    const user = useUser();

    const [expanded, setExpanded] = useState<boolean>(false);
    const [algorithms, setAlgorithms] = useState<Algorithm[] | undefined>()
    const [enteredAlg, setEnteredAlg] = useState<string>("")
    const [algorithmUsed, setAlgorithmUsed] = useState<Algorithm | undefined>()
    const [userAlg, setUserAlg] = useState<UserAlgorithm | undefined>()
    const [loadingAlgUsed, setLoadingAlgUsed] = useState<boolean>(true)
    const [learned, setLearned] = useState<boolean | undefined>()

    const validInput = useMemo(() => /^[RUFLDBMESrufldbmeswxyz\'\[\]\(\)\:\,\s\d]+$/.test(enteredAlg) || enteredAlg.length == 0, [enteredAlg])
    const getHelperText = useMemo(() => (validInput ? "" : "Invalid algorithm notation"), [validInput])

    function loadAlgorithms() {
        if (!algorithms) {
            fetch(`/api/algorithm?type=${props.case.type}&buffer=${'C'}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
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
            case: props.case
        } as Algorithm

        setEnteredAlg("")

        await fetch('/api/algorithm', {
            method: 'POST',
            body: JSON.stringify({ algorithm: alg })
        })

        const data = await fetch(`/api/algorithm?type=${props.case.type}&buffer=${props.case.buffer}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
        const newAlgs = await data.json() as { algorithms: Algorithm[] }
        setAlgorithms(newAlgs.algorithms)
    }

    async function setUsedAlg(usedAlg: Algorithm) {
        async function updateUsedAlgs() {
            setLoadingAlgUsed(true)
            const res = await fetch(`/api/user_algorithm?type=${props.case.type}&buffer=${props.case.buffer}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
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

    async function toggleLearned() {
        async function loadLearned() {
            const res = await fetch(`/api/learned_algs?type=${props.case.type}&buffer=${props.case.buffer}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
            const data = await res.json()

            setLearned(data.learned)
        }

        setLearned(undefined)  // Displays loading wheel

        if (!learned) {
            // Going from not learned to learned
            await fetch('/api/learned_algs', {
                method: 'POST',
                body: JSON.stringify({ case: props.case, type: props.case.type })
            })
        } else {
            // Going from learned to not learned
            await fetch('/api/learned_algs', {
                method: 'DELETE',
                body: JSON.stringify({ case: props.case, type: props.case.type })
            })
        }

        loadLearned()
    }

    useEffect(() => {
        async function updateUsedAlgs() {
            setLoadingAlgUsed(true)
            const res = await fetch(`/api/user_algorithm?type=${props.case.type}&buffer=${props.case.buffer}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
            const data = await res.json()

            setUserAlg(data.userAlgorithm)
            setAlgorithmUsed(data.userAlgorithm.alg)
            setLoadingAlgUsed(false)
        }

        async function loadLearned() {
            const res = await fetch(`/api/learned_algs?type=${props.case.type}&buffer=${props.case.buffer}&target_a=${props.case.target_a}&target_b=${props.case.target_b}`)
            const data = await res.json()

            setLearned(data.learned)
        }

        if (!user.user) {
            return  // Don't make API calls that require the user to be logged in
        }

        updateUsedAlgs()
        loadLearned()
    }, [])

    return (
        <StyledCard sx={{ width: '100%', mb: 2 }}>
            <Stack direction='column' spacing={2}>

                <Stack direction='row' justifyContent='space-between' spacing={2} width='100%' >
                    <Stack alignItems='flex-start'>
                        <Typography variant='cardHeader' color={props.color}>{props.case.target_a}{props.case.target_b}</Typography>
                        {/* TODO add/display category chip */}
                        {
                            user.user ?
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
                                :
                                <Tooltip title="View algorithms">
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
                                        View algorothms
                                    </Typography>

                                </Tooltip>
                        }
                    </Stack>
                    <Stack spacing={0}>
                        {
                            user.user ?
                                learned == undefined ?
                                    <CircularProgress color={props.color} />
                                    :
                                    <Tooltip title="Mark as learned">
                                        <Checkbox
                                            color={props.color}
                                            icon={<SchoolOutlinedIcon />}
                                            checkedIcon={<SchoolIcon />}
                                            checked={learned}
                                            onClick={toggleLearned}
                                        />
                                    </Tooltip>
                                :
                                <Tooltip title="Log in to mark as learned">
                                    <Link href='/login'>
                                        <Checkbox
                                            color={props.color}
                                            icon={<SchoolOutlinedIcon />}
                                            checkedIcon={<SchoolIcon />}
                                            checked={false}
                                        />
                                    </Link>
                                </Tooltip>
                        }
                    </Stack>
                </Stack>

                <Collapse in={expanded} timeout='auto' sx={{ width: '100%' }} unmountOnExit>
                    <Stack direction='column' spacing={2} width='100%'>
                        <StyledDivider />
                        {
                            user.user ?
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
                                :
                                <Stack>
                                    <Tooltip title="Click to log in">
                                        <Link href='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography>
                                                Log in to set what algorithm you use, or add a new one
                                            </Typography>
                                        </Link>
                                    </Tooltip>

                                    <StyledDivider />
                                </Stack>
                        }
                        {
                            algorithms ?
                                algorithms.map((alg, i) => (
                                    user.user ?
                                        <Tooltip key={i} title={"Click to select this algorithm"} onClick={() => { setUsedAlg(alg) }}>
                                            <Typography variant='cardSubheader'>{alg.algorithm}</Typography>
                                        </Tooltip>
                                        :
                                        <Tooltip key={i} title={"Log in to select an algorithm"}>
                                            <Link href='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Typography variant='cardSubheader'>{alg.algorithm}</Typography>
                                            </Link>
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
