import { Avatar, Stack, Typography } from "@mui/material";
import StyledCard from "@/components/styledCard";

export function WeeklyProgressEntry(props: { header: string, subheader: string, color: string, letter: string }) {
    return (
        <StyledCard sx={{ outlineWidth: 0 }}>
            <Stack direction='row' justifyContent='flex-start' spacing={2} >
                <Avatar sx={{ bgcolor: props.color }}>{props.letter}</Avatar>
                <Stack alignItems='flex-start'>
                    <Typography variant="cardHeader">{props.header}</Typography>
                    <Typography variant="cardSubheader" textAlign='center'>{props.subheader}</Typography>
                </Stack>
            </Stack>
        </StyledCard>
    )
}
