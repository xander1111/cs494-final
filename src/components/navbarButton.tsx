import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

export function NavbarButton(props: { color: "inherit" | "error" | "primary" | "secondary" | "success" | "info" | "warning", text: string, href: string, icon?: ReactNode }) {
    return (
        <Link href={props.href}>
            <Button
                color={props.color}
                variant='contained'
                startIcon={props.icon}
            >
                <Typography variant='navbar' >{props.text}</Typography>
            </Button>
        </Link>
    )
}

