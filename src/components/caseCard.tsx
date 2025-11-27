import { Checkbox, InputLabel, Stack, Typography } from "@mui/material";
import StyledCard from "@/components/styledCard";

export function CaseCard(props: { case: string, algorithm: string, color: 'primary' | 'secondary' }) {
    return (
        <StyledCard sx={{ width: '100%', mb: 2 }}>
            <Stack direction='row' justifyContent='space-between' spacing={2} >
                <Stack alignItems='flex-start'>
                    <Typography variant="cardHeader" color={props.color}>{props.case}</Typography>
                    <Typography variant="cardSubheader" textAlign='center'>{props.algorithm}</Typography>
                </Stack>
                <Stack spacing={0}>
                    <Checkbox color={props.color} />
                    <InputLabel sx={{ color: 'common.black' }}>Learned</InputLabel>
                </Stack>
            </Stack>
        </StyledCard>
    )
}
