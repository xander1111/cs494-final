'use client'

import { useEffect, useState } from "react";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { CategoryChip } from "@/components/categoryChip";

import { getColorForCategory } from "@/utils/categoryUtils";

export function StatLine(props: { category: string, type: string, totalCases: number, nonPercent?: boolean }) {
    const [learnedCasesCount, setLearnedCasesCount] = useState<number | undefined>()
    const [learnedPercent, setLearnedPercent] = useState<number | undefined>()

    const color = getColorForCategory(props.category)

    useEffect(() => {
        async function getLearnedCases() {
            let res
            if (props.type === 'letterPair') {
                res = await fetch(`/api/user_word/learned`)
            } else if (props.category === 'Total') {
                res = await fetch(`/api/learned_algs/learned?type=${props.type}`)
            } else {
                res = await fetch(`/api/learned_algs/learned?category=${props.category}`)
            }

            const data = await res.json()

            setLearnedCasesCount(data.overall)
            setLearnedPercent(data.overall / props.totalCases * 100)
        }

        getLearnedCases()
    }, [])

    return (
        <Stack direction='row' justifyContent='space-between' width='100%' >
            <CategoryChip category={props.category} />
            {
                learnedPercent !== undefined ?
                    <Stack direction='row' justifyContent='flex-end' spacing={2} width='25%' height='100%' >
                        {
                            props.nonPercent ?
                                <Typography variant="cardSubheader" color='common.black' textAlign='center' whiteSpace='nowrap'>{learnedCasesCount} Words</Typography>
                                :
                                <>
                                    <Typography variant="cardSubheader" color='common.black' textAlign='center' whiteSpace='nowrap'>{learnedCasesCount}/{props.totalCases}</Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
                                        <CircularProgress
                                            enableTrackSlot
                                            size='2.5rem'
                                            variant='determinate'
                                            color={color}
                                            value={learnedPercent}
                                            sx={{
                                                '& .MuiCircularProgress-track': {
                                                    color: 'common.black',
                                                    opacity: 0.2
                                                }
                                            }}
                                        />
                                        <Typography variant='small' position='absolute'>{learnedPercent >= 10 ? learnedPercent.toFixed(0) : learnedPercent.toFixed(1)}%</Typography>
                                    </Box>
                                </>
                        }
                    </Stack>
                    :
                    <CircularProgress size='2.5rem' color={color} />
            }
        </Stack>
    )
}
