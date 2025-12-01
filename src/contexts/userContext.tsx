'use client'

import { createContext, useContext, useState } from "react";

import { useRouter } from "next/navigation"

import { User } from "@supabase/supabase-js";

// data structure
type UserProps = {
    user: User | undefined,
    signOut: () => void,
}

// create context
const UserContext = createContext<UserProps | undefined>(undefined)

// provider
export function UserProvider(props: { user: User | undefined, children: React.ReactNode }) {
    const router = useRouter()

    async function signOut() {
        await fetch('/api/signOut')
        router.push('/login')
    }

    return (
        <UserContext.Provider value={{ user: props.user, signOut }}>
            {props.children}
        </UserContext.Provider>
    )
}

// use
export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within ProfileProvider")
    }
    return context
}
