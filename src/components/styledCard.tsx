'use client'

import { Card } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    outlineColor: theme.palette.common.black,
    borderRadius: 10,
    padding: 16,
    outline: 'solid',
    outlineWidth: '0.15rem',
    boxShadow: 'none',
    variants: {
        'noOutline' : {
            outlineWidth: '0',
        },
    }
}))

export default StyledCard
