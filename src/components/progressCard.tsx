import { Avatar, Box, CircularProgress, Stack, Typography } from "@mui/material";
import StyledCard from "@/components/styledCard";

export function ProgressCard(props: { type: string, color: 'primary' | 'secondary' | 'error' | 'success' }) {
    return (
        <StyledCard sx={{ width: '100%', aspectRatio: 1 }}>
            <Stack direction='row' spacing={2} justifyContent='space-evenly' alignItems='center' height='100%' >
                <Avatar sx={{ bgcolor: 'common.black', width: '40%', height: '40%', borderRadius: '10%' }}>{props.type}</Avatar>
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
                                    color: 'common.black',
                                    opacity: '20%'
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
