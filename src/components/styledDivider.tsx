'use client'

import { Divider, DividerProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledDivider = styled(Divider)<DividerProps>(({ theme, orientation }) => ({
    borderColor: theme.palette.common.black,
    ...(orientation === 'vertical' 
        ? {
            height: 'auto',
            alignSelf: 'stretch',
            borderRightWidth: '0.15rem',
            borderBottomWidth: 0,
            width: 'auto',
        }
        : {
            width: '100%',
            borderBottomWidth: '0.15rem',
            borderRightWidth: 0,
        }
    ),
}))

export default StyledDivider
