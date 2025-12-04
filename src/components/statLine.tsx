import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { CategoryChip } from "@/components/categoryChip";

import { getColorForCategory } from "@/utils/categoryUtils";

export function StatLine(props: { category: string, numericCompletion: string, percentCompletion: number }) {
    const color = getColorForCategory(props.category)

    return (
        <Stack direction='row' justifyContent='space-between' width='100%' >
            <CategoryChip category={props.category} />
            <Stack direction='row' justifyContent='flex-end' spacing={2} width='25%' height='100%' >
                <Typography variant="cardSubheader" color='common.black' textAlign='center' whiteSpace='nowrap'>{props.numericCompletion}</Typography>
                <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
                    <CircularProgress
                        enableTrackSlot
                        size='2.5rem'
                        variant='determinate'
                        color={color}
                        value={props.percentCompletion}
                        sx={{
                            '& .MuiCircularProgress-track': {
                                color: 'common.black',
                                opacity: 0.2
                            }
                        }}
                    />
                    <Typography variant='small' position='absolute'>{props.percentCompletion}%</Typography>
                </Box>
            </Stack>
        </Stack>
    )
}
