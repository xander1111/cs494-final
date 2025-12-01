import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        return Response.json({ message: "Failed to sign out" })
    }

    return Response.json({message: "Signed out successfully"})
}
