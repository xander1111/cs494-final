'use client'

import { useEffect, useState } from "react";

import { CircularProgress, Stack, Typography } from "@mui/material";

import TextFieldsIcon from '@mui/icons-material/TextFields';
import CalculateIcon from '@mui/icons-material/Calculate';

import { useUser } from "@/contexts/userContext";

import StyledCard from "@/components/styledCard";
import StyledDivider from "@/components/styledDivider";
import { WeeklyProgressEntry } from "@/components/weeklyProgressEntry";
import { CornerGridIcon } from "@/components/cornerGridIcon";
import { EdgeGridIcon } from "@/components/edgeGridIcon";

export function WeeklyProgressCard() {
    const user = useUser()

    const [overallLearnedCount, setOverallLearnedCount] = useState<number | undefined>()
    const [cornersLearnedCount, setCornersLearnedCount] = useState<number | undefined>()
    const [edgesLearnedCount, setEdgesLearnedCount] = useState<number | undefined>()
    const [wordsAddedCount, setWordsAddedCount] = useState<number | undefined>()

    const [completionEstimate, setCompletionEstimate] = useState<Date | undefined | boolean>()  // true = completed, false = no estimate

    useEffect(() => {
        async function getWeeklyOverall() {
            const res = await fetch('/api/learned_algs/learned')
            const data = await res.json()

            setOverallLearnedCount(data.recent)
            return [data.recent, data.overall]
        }

        async function getWeeklyCorners() {
            const res = await fetch('/api/learned_algs/learned?type=corner')
            const data = await res.json()

            setCornersLearnedCount(data.recent)
            return [data.recent, data.overall]
        }

        async function getWeeklyEdges() {
            const res = await fetch('/api/learned_algs/learned?type=edge')
            const data = await res.json()

            setEdgesLearnedCount(data.recent)
            return [data.recent, data.overall]
        }

        async function getWeeklyWords() {
            const res = await fetch('/api/user_word/learned')
            const data = await res.json()

            setWordsAddedCount(data.recent)
            return [data.recent, data.overall]
        }

        async function getWeeklyAdditions() {
            const [, [cornersRecent, cornersOverall], [edgesRecent, edgesOverall],] = await Promise.all([
                getWeeklyOverall(),
                getWeeklyCorners(),
                getWeeklyEdges(),
                getWeeklyWords(),
            ])

            // Estimate completion date
            const casesRemaining = 818 - cornersOverall - edgesOverall

            const pace = ((cornersRecent ?? 0) + (edgesRecent ?? 0)) / 7

            const daysToComplete = casesRemaining / pace

            if (daysToComplete < 0) {
                setCompletionEstimate(true)
            } else if (daysToComplete == Infinity) {
                setCompletionEstimate(false)
            } else {
                setCompletionEstimate(new Date(Date.now() + daysToComplete * 24 * 60 * 60 * 1000))
            }
        }

        if (!user.user)
            return

        getWeeklyAdditions()
    }, [])

    return (
        <StyledCard>
            <Stack>
                <Typography variant="cardHeader">Weekly Progress</Typography>
                <Stack spacing={0}>
                    <Typography variant="cardSubheader">Estimated 3-Style completion date:</Typography>
                    {
                        completionEstimate !== undefined ?
                            completionEstimate === true ?
                                <Typography variant="cardSubheader">Complete!</Typography>
                                :
                                completionEstimate === false ?
                                    <Typography variant="cardSubheader">N/A</Typography>
                                    :
                                    <Typography variant="cardSubheader">{completionEstimate.toLocaleDateString()}</Typography>
                            :
                            <CircularProgress color='warning' />
                    }
                </Stack>

                <StyledDivider />

                <Stack alignItems='flex-start'>
                    <WeeklyProgressEntry
                        header="Algorithms Learned"
                        subheader={{
                            prefix: "Learned ",
                            count: overallLearnedCount,
                            postfix: " total new algorithms"
                        }}
                        color='error'
                        icon={<CalculateIcon />}
                    />
                    <WeeklyProgressEntry
                        header="Corners Learned"
                        subheader={{
                            prefix: "Learned ",
                            count: cornersLearnedCount,
                            postfix: " new algorithms"
                        }}
                        color='secondary'
                        icon={<CornerGridIcon />}
                    />
                    <WeeklyProgressEntry
                        header="Edges Learned"
                        subheader={{
                            prefix: "Learned ",
                            count: edgesLearnedCount,
                            postfix: " new algorithms"
                        }}
                        color='primary'
                        icon={<EdgeGridIcon />}
                    />
                    <WeeklyProgressEntry
                        header="Words Added"
                        subheader={{
                            prefix: "Added ",
                            count: wordsAddedCount,
                            postfix: " new words"
                        }}
                        color='success'
                        icon={<TextFieldsIcon />}
                    />
                </Stack>

            </Stack>
        </StyledCard>
    )
}
