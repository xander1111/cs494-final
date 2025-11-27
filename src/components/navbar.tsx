import { Box } from "@mui/material";
import { NavbarButton } from "@/components/navbarButton";

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
                <NavbarButton color='error' text="Home" href='/' />
                <NavbarButton color='secondary' text="Corners" href='/corners' />
                <NavbarButton color='primary' text="Edges" href='/edges' />
                <NavbarButton color='success' text="Letter Pairs" href='/letters' />
            </Box>
            <NavbarButton color='warning' text="Login" href='/auth' />
        </Box>
    )
}