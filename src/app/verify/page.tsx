import { Button, Stack, Typography } from "@mui/material"

import StyledCard from "@/components/styledCard"
import Link from "next/link"

export default function Home() {
    return (
        <Stack direction='column' alignItems='center' justifyContent='center'>
            <StyledCard>
                <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} p={2}>
                    <Typography variant='cardHeader'>Verify your email</Typography>
                    <Stack spacing={1}>
                        <Typography variant='cardSubheader'>A verification email has been sent to the email you entered.</Typography>
                        <Typography variant='cardSubheader'>Please verify your email before logging in.</Typography>
                    </Stack>
                    <Stack direction='row' width='100%' justifyContent='space-between'>
                        <Link href={'/'}><Button color='success' variant='contained' >Home</Button></Link> 
                        <Link href={'/login'}><Button variant='contained' >Log in</Button></Link>
                    </Stack>
                </Stack>
            </StyledCard>
        </Stack>

    )
}
