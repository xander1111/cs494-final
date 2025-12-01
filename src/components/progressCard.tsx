'use client'

import { Avatar, Box, CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import StyledCard from "@/components/styledCard";
import { ReactNode } from "react";
import Link from "next/link";

export function ProgressCard(props: { type: string, color: 'primary' | 'secondary' | 'error' | 'success', icon: ReactNode, href?: string }) {
    const theme = useTheme();
    
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
                        <CircularProgress
                            enableTrackSlot
                            size='100%'
                            variant='determinate'
                            color={props.color}
                            value={10}
                            sx={{
                                '& .MuiCircularProgress-track': {
                                    color: theme.palette.common.black,
                                    opacity: 0.2
                                }
                            }}
                        />
                        <Typography variant='cardSubheader' position='absolute'>{10}%</Typography>
                    </Box>
                    <Typography variant='cardHeader'>{props.type}</Typography>
                    <Typography variant='cardSubheader' textAlign='center'>[x/y]</Typography>
                </Stack>
            </Stack>
        </StyledCard>
    )
}
