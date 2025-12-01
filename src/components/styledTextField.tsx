'use client'

import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.common.black,
            borderWidth: '2px',
        },
    },
    '& .MuiFormLabel-root': {
        color: theme.palette.common.black,
    },
}))

const StyledTextFieldWithColor = (props: TextFieldProps & { color: string }) => (
    <StyledTextField
        {...props}

        sx={{
            '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: `${props.color}.main`,
                    borderWidth: '2px',
                },
                '&.Mui-focused fieldset': {
                    borderColor: `${props.color}.main`,
                    borderWidth: '3px',
                },
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: `${props.color}.main`,
            },
        }}

    />
);

export default StyledTextFieldWithColor
