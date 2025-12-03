import { ReactNode } from "react";

import { useUser } from "@/contexts/userContext";

import { Stack, Typography } from "@mui/material";

import StyledCard from "@/components/styledCard";
import StyledDivider from "@/components/styledDivider";

export function StatsCard(props: { type: string, children?: ReactNode }) {
    const user = useUser()

    return (
        <>
            {
                user.user ?
                    <StyledCard sx={{ width: '25%', p: 4 }}>
                        <Stack direction='column' spacing={2} >
                            <Typography variant="cardHeader" color='common.black'>{props.type} Stats</Typography>
                            <StyledDivider />

                            <Stack direction='column' spacing={1} width='100%'>
                                {props.children}
                            </Stack>
                        </Stack>
                    </StyledCard>
                    :
                    <StyledCard sx={{ width: '25%', p: 4 }}>
                        <Stack direction='column' spacing={2} >
                            <Typography variant="cardHeader" color='common.black'>{props.type} Stats</Typography>
                            <StyledDivider />

                            <Stack direction='column' spacing={1} width='100%'>
                                <Typography variant="cardSubheader" color='common.black'>Log in to see completion stats</Typography>
                            </Stack>
                        </Stack>
                    </StyledCard>
            }
        </>
    )
}
