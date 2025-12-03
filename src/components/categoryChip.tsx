import { Card, Tooltip, Typography } from "@mui/material";

import { getColorForCategory } from "@/utils/categoryUtils";

export function CategoryChip(props: { category: string }) {
    const color = getColorForCategory(props.category)

    return (
        <Tooltip title="Click to filter cases">
            <Card sx={{
                backgroundColor: 'common.white',
                borderRadius: '10px',
                py: 0.7,
                px: 2,
                outline: 'solid',
                outlineWidth: '0.15rem',
                outlineColor: `${color}.main`,
                boxShadow: 'none',
            }}>
                <Typography variant="cardSubheader" color={color} >{props.category}</Typography>
            </Card>
        </Tooltip>
    )
}
