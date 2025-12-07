import { ReactNode } from "react";

import { Avatar, CircularProgress, Stack, Typography } from "@mui/material";
import StyledCard from "@/components/styledCard";

export function WeeklyProgressEntry(props: { header: string, subheader: { prefix: string, count?: number, postfix: string }, color: 'primary' | 'secondary' | 'error' | 'success', icon: ReactNode }) {
    return (
        <StyledCard sx={{ outlineWidth: 0 }}>
            <Stack direction='row' justifyContent='flex-start' spacing={2} >
                <Avatar sx={{ bgcolor: `${props.color}.main` }}>{props.icon}</Avatar>
                <Stack alignItems='flex-start'>
                    <Typography variant="cardHeader" color='common.black'>{props.header}</Typography>
                    {
                        props.subheader.count !== undefined ?
                            <Typography variant="cardSubheader" color='common.black' textAlign='center'>{props.subheader.prefix}{props.subheader.count}{props.subheader.postfix}</Typography>
                            :
                            <CircularProgress color={props.color} />
                    }
                </Stack>
            </Stack>
        </StyledCard>
    )
}
