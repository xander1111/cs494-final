'use client'

import { Select, SelectProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.common.black,
        borderWidth: '2px',
    }
}));

// Wrapper component to add MenuProps
const StyledSelectWithMenu = (props: SelectProps & {color: string}) => (
    <StyledSelect
        {...props}
        sx={{
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: `${props.color}.main`,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: `${props.color}.main`,
            },
        }}
        MenuProps={{
            PaperProps: {
                sx: {
                    bgcolor: 'common.white',
                    borderRadius: '8px',
                    '& .MuiMenuItem-root': {
                        color: 'common.black',
                        '&:hover': {
                            bgcolor: `${props.color}.light`,
                        },
                        '&.Mui-selected': {
                            bgcolor: `${props.color}.main`,
                            color: 'common.white',
                        },
                        '&.Mui-selected :hover': {
                            bgcolor: `${props.color}.main`,
                            color: 'common.white',
                        },
                    },
                },
            },
        }}
    />
);

export default StyledSelectWithMenu