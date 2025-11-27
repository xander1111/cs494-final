'use client'

import { Select, SelectProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.common.black,
        borderWidth: '2px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
        borderWidth: '2px',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
        borderWidth: '3px',
    },
}));

// Wrapper component to add MenuProps
const StyledSelectWithMenu = (props: SelectProps) => (
    <StyledSelect
        {...props}
        MenuProps={{
            PaperProps: {
                sx: {
                    bgcolor: 'common.white',
                    borderRadius: '8px',
                    '& .MuiMenuItem-root': {
                        color: 'common.black',
                        '&:hover': {
                            bgcolor: 'secondary.light',
                        },
                        '&.Mui-selected': {
                            bgcolor: 'secondary.main',
                            color: 'common.white',
                        },
                    },
                },
            },
        }}
    />
);

export default StyledSelectWithMenu