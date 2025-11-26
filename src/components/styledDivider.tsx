'use client'

import { Divider } from "@mui/material";
import { styled } from "@mui/system";

const StyledDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    borderBottomWidth: '0.15rem',
    borderColor: theme.palette.common.black,
}))

export default StyledDivider
