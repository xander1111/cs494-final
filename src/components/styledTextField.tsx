'use client'

import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.common.black,
            borderWidth: '2px',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.secondary.main,
            borderWidth: '2px',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
            borderWidth: '3px',
        },
    },
    '& .MuiFormLabel-root': {
        color: theme.palette.common.black,
    },
    '& .MuiFormLabel-root.Mui-focused': {
        color: theme.palette.secondary.main,
    },
}))

export default StyledTextField
