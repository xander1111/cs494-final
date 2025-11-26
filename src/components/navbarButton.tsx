import { Button, Typography } from "@mui/material";
import Link from "next/link";

export function NavbarButton(props: { color: "inherit" | "error" | "primary" | "secondary" | "success" | "info" | "warning", text: string, href: string }) {
    return (
        <Link href={props.href}>
            <Button
                color={props.color}
                variant='contained'
            >
                <Typography variant='navbar' >{props.text}</Typography>
            </Button>
        </Link>
    )
}

