import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { CategoryChip } from "@/components/categoryChip";

export function StatLine(props: { category: string, numericCompletion: string, percentCompletion: number, color: 'primary' | 'secondary' | 'error' | 'success' }) {
    return (
        <Stack direction='row' justifyContent='space-between' width='100%' >
            <CategoryChip category={props.category} color={props.color} />
            <Stack direction='row' justifyContent='flex-end' spacing={2} width='25%' >
                <Typography variant="cardSubheader" color='common.black' textAlign='center' whiteSpace='nowrap'>{props.numericCompletion}</Typography>
                <Box display='flex' justifyContent='center' alignItems='center' width='80%' height='80%'>
                    <CircularProgress
                        enableTrackSlot
                        size='100%'
                        variant='determinate'
                        color={props.color}
                        value={props.percentCompletion}
                        sx={{
                            '& .MuiCircularProgress-track': {
                                color: 'common.black',
                                opacity: '20%'
                            }
                        }}
                    />
                    <Typography variant='small' position='absolute'>{props.percentCompletion}%</Typography>
                </Box>
            </Stack>
        </Stack>
    )
}
