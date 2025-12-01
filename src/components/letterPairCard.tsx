import { Checkbox, InputLabel, Stack, Typography } from "@mui/material";
import StyledCard from "@/components/styledCard";

export function LetterPairCard(props: { letterPair: string, words: string[], color: 'primary' | 'secondary' | 'error' | 'success' }) {
    return (
        <StyledCard sx={{ width: '100%', mb: 2 }}>
            <Stack direction='row' justifyContent='space-between' spacing={2} >
                <Stack alignItems='flex-start'>
                    <Typography variant="cardHeader" color={props.color}>{props.letterPair}</Typography>
                    <Typography variant="cardSubheader" color='common.black' textAlign='center'>{props.words.join(", ")}</Typography>
                </Stack>
                <Stack spacing={0}>
                    <Checkbox color={props.color} />
                    <InputLabel sx={{ color: 'common.black' }}>Learned</InputLabel>
                </Stack>
            </Stack>
        </StyledCard>
    )
}
