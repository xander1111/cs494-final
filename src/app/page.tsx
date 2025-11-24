import { Box } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Box sx={{
        bgcolor: 'common.white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 5rem)',
        marginTop: '5rem',
      }}>
        <Box height='75%'>
          <Box height='100%'>
            {/** Weekly progress card */}
          </Box>
          <Box height='100%'>
            {/** Current progress cards */}
          </Box>
        </Box>
      </Box>
    </main>
  );
}
