import { Box } from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import LoginIcon from '@mui/icons-material/Login';

import { NavbarButton } from "@/components/navbarButton";
import { CornerGridIcon } from "@/components/cornerGridIcon";
import { EdgeGridIcon } from "@/components/edgeGridIcon";


export function Navbar() {
    return (
        <Box
            height="4rem"
            sx={{
                bgcolor: 'common.black',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                position: 'fixed',
                top: '0',
                width: '100vw'
            }}
        >
            <Box>
                <NavbarButton color='error' text="Home" href='/' icon={<HomeIcon />} />
                <NavbarButton color='secondary' text="Corners" href='/corners' icon={<CornerGridIcon />} />
                <NavbarButton color='primary' text="Edges" href='/edges' icon={<EdgeGridIcon />} />
                <NavbarButton color='success' text="Letter Pairs" href='/letterPairs' icon={<TextFieldsIcon />} />
            </Box>
            <NavbarButton color='warning' text="Login" href='/auth' icon={<LoginIcon />} />
        </Box>
    )
}