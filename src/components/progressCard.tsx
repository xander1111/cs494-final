'use client'

import { ReactNode, useEffect, useState } from "react";

import { Avatar, Box, CircularProgress, Stack, Typography } from "@mui/material";
import StyledCard from "@/components/styledCard";
import Link from "next/link";

export function ProgressCard(props: { title: string, type: string, nonPercent?: boolean, totalCases: number, color: 'primary' | 'secondary' | 'error' | 'success', icon: ReactNode, href?: string }) {
    const [completedCases, setCompletedCases] = useState<number | undefined>()

    useEffect(() => {
        async function getCompletedCases() {
            let data

            if (props.type === 'letterPair') {
                const res = await fetch(`/api/user_word/learned`)
                data = await res.json()
            } else if (props.type === 'overall') {
                const res = await fetch(`/api/learned_algs/learned`)
                data = await res.json()
            } else {
                const res = await fetch(`/api/learned_algs/learned?type=${props.type}`)
                data = await res.json()
            }

            setCompletedCases(data.overall)
        }

        getCompletedCases()
    }, [])

    return (
        <StyledCard sx={{ width: '100%', aspectRatio: 1 }}>
            <Stack direction='row' spacing={2} justifyContent='space-evenly' alignItems='center' height='100%' >
                {
                    props.href ?
                        <Link href={props.href} style={{ display: 'contents' }}>
                            <Avatar sx={{ bgcolor: `${props.color}.main`, width: '40%', height: '40%', borderRadius: '10%' }}>{props.icon}</Avatar>
                        </Link>
                        :
                        <Avatar sx={{ bgcolor: `${props.color}.main`, width: '40%', height: '40%', borderRadius: '10%' }}>{props.icon}</Avatar>
                }
                <Stack width={"40%"}>
                    <Box display='flex' justifyContent='center' alignItems='center' width='80%' height='80%'>
                        {
                            completedCases === undefined ?
                                <CircularProgress size='100%' color={props.color} />
                                :
                                props.nonPercent ?
                                    <Typography variant='cardHeader' >
                                        {completedCases}
                                    </Typography>
                                    :
                                    <CircularProgress
                                        enableTrackSlot
                                        size='100%'
                                        variant='determinate'
                                        color={props.color}
                                        value={(completedCases ?? 0) / props.totalCases * 100}
                                        sx={{
                                            '& .MuiCircularProgress-track': {
                                                color: 'common.black',
                                                opacity: 0.2
                                            }
                                        }}
                                    />
                        }
                        {
                            props.nonPercent || completedCases === undefined ?
                                null
                                :
                                <Typography variant='cardSubheader' position='absolute'>{((completedCases ?? 0) / props.totalCases * 100).toFixed(2)}%</Typography>
                        }

                    </Box>
                    <Typography variant='cardHeader' textAlign='center'>{props.title}</Typography>
                    {
                        props.nonPercent || completedCases === undefined ?
                            null
                            :
                            <Typography variant='cardSubheader' textAlign='center'>{`${completedCases}/${props.totalCases}`}</Typography>
                    }
                </Stack>
            </Stack>
        </StyledCard>
    )
}
