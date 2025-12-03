import type { Metadata } from "next";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

import { Box } from "@mui/material";

import { AppThemeProvider } from "@/theme/themeProvider";
import { Navbar } from "@/components/navbar";
import { UserProvider } from "@/contexts/userContext";


export const metadata: Metadata = {
  title: "3 Style",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppThemeProvider>
      <UserProvider user={await getUser()}>
        <html lang="en">
          <body>
            <Navbar />
            <main>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 4rem)',
                marginTop: '4rem',
              }}>
                {children}
              </Box>
            </main>
          </body>
        </html>
      </UserProvider>
    </AppThemeProvider>
  );
}

async function getUser(): Promise<User | undefined> {
  const supabase = await createClient()

  const user = await supabase.auth.getUser()

  if (!user || !user.data.user) {
    return undefined
  }

  return user.data.user
}
