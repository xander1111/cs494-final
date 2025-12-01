import { Card, Typography } from "@mui/material";

export function CategoryChip(props: { category: string, color: 'primary' | 'secondary' | 'error' | 'success' }) {
    return (
        <Card sx={{
            backgroundColor: 'common.white',
            borderRadius: '10px',
            py: 0.7,
            px: 2,
            outline: 'solid',
            outlineWidth: '0.15rem',
            outlineColor: `${props.color}.main`,
            boxShadow: 'none',
        }}>
            <Typography variant="cardSubheader" color={props.color} >{props.category}</Typography>
        </Card>
    )
}
