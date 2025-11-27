import { Avatar, CircularProgress, Stack, Typography } from "@mui/material";
import StyledCard from "./styledCard";

export function ProgressCard(props: { type: string }) {
    return (
        <StyledCard sx={{ width: '100%', aspectRatio: 1 }}>
            <Stack direction='row' spacing={2} justifyContent='space-evenly' alignItems='center' height='100%' >
                <Avatar sx={{ bgcolor: 'common.black', width: '40%', height: '40%', borderRadius: '10%' }}>{props.type}</Avatar>
                <Stack width={"40%"}>
                    <CircularProgress
                        enableTrackSlot
                        size='80%'
                        variant='determinate'
                        color='primary'
                        value={10}
                    />
                    <Typography variant='cardHeader'>{props.type}</Typography>
                    <Typography variant='cardSubheader' textAlign='center'>[x/y]</Typography>
                </Stack>
            </Stack>
        </StyledCard>
    )
}
