import { Button, Stack, Typography } from "@mui/material"

import { login, loginGoogle, signup } from './actions'

import GoogleIcon from '@mui/icons-material/Google';

import StyledCard from "@/components/styledCard"
import StyledTextField from "@/components/styledTextField"


export default function LoginPage() {


  return (
    <Stack direction='column' alignItems='center' justifyContent='center'>
      <StyledCard>
        <form>
          <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} p={2}>
            <Typography variant='cardHeader'>Log in</Typography>
            <Stack direction='column'>
              <StyledTextField color='warning' id='email' name='email' type='email' label="Email" variant='outlined' required />
              <StyledTextField color='warning' id='password' name='password' type='password' label="Password" variant='outlined' required />
            </Stack>

            <Button color='warning' fullWidth variant='contained' onClick={loginGoogle} startIcon={<GoogleIcon />}>Log in with Google</Button>

            <Stack direction='row' width='100%' justifyContent='space-between'>
              <Button color='success' variant='contained' formAction={login} type='submit'>Log in</Button>
              <Button variant='contained' formAction={signup} type='submit'>Sign up</Button>
            </Stack>
          </Stack>
        </form>
      </StyledCard>
    </Stack>

  )
}
