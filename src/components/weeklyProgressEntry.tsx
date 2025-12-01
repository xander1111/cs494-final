import { ReactNode } from "react";

import { Avatar, Stack, Typography } from "@mui/material";
import StyledCard from "@/components/styledCard";

export function WeeklyProgressEntry(props: { header: string, subheader: string, color: string, icon: ReactNode }) {
    return (
        <StyledCard sx={{ outlineWidth: 0 }}>
            <Stack direction='row' justifyContent='flex-start' spacing={2} >
                <Avatar sx={{ bgcolor: props.color }}>{props.icon}</Avatar>
                <Stack alignItems='flex-start'>
                    <Typography variant="cardHeader" color='common.black'>{props.header}</Typography>
                    <Typography variant="cardSubheader" color='common.black' textAlign='center'>{props.subheader}</Typography>
                </Stack>
            </Stack>
        </StyledCard>
    )
}
