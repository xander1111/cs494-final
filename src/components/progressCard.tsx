import { Avatar, Stack, Typography } from "@mui/material";
import StyledCard from "./styledCard";

export function ProgressCard(props: { header: string, subheader: string, color: string }) {
    return (
        <StyledCard sx={{ outlineWidth: 0 }}>
            <Stack direction='row' justifyContent='flex-start' spacing={2} >
                <Avatar sx={{ bgcolor: props.color }}>A</Avatar>
                <Stack alignItems='flex-start'>
                    <Typography variant="cardHeader">{props.header}</Typography>
                    <Typography variant="cardSubheader" textAlign='center'>{props.subheader}</Typography>
                </Stack>
            </Stack>
        </StyledCard>
    )
}
