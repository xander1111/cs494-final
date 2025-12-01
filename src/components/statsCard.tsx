import { ReactNode } from "react";

import { Stack, Typography } from "@mui/material";

import StyledCard from "@/components/styledCard";
import StyledDivider from "@/components/styledDivider";

export function StatsCard(props: { type: string, children?: ReactNode }) {
    return (
        <StyledCard sx={{ width: '25%', p: 4 }}>
            <Stack direction='column' spacing={2} >
                <Typography variant="cardHeader" color='common.black'>{props.type} Stats</Typography>
                <StyledDivider />

                <Stack direction='column' spacing={1} width='100%'>
                    {props.children}
                </Stack>
            </Stack>
        </StyledCard>
    )
}
