'use client'

import { Card, Tooltip, Typography } from "@mui/material";

import { getColorForCategory } from "@/utils/categoryUtils";

export function CategoryChip(props: { category: string, setFilter?: (value: string | undefined) => void, removeFilter?: boolean }) {
    const color = getColorForCategory(props.category)

    return (
        <>
            {
                props.setFilter ?
                    <Tooltip title={props.removeFilter ? "Click to remove filter" : "Click to filter cases"}>
                        <Card sx={{
                            backgroundColor: 'common.white',
                            borderRadius: '10px',
                            py: 0.7,
                            px: 2,
                            outline: 'solid',
                            outlineWidth: '0.15rem',
                            outlineColor: `${color}.main`,
                            boxShadow: 'none',
                            cursor: 'pointer',
                        }}
                            onClick={() => { props.setFilter!(props.removeFilter ? undefined : props.category) }}
                        >
                            <Typography variant="cardSubheader" color={color} >{props.category}</Typography>
                        </Card>
                    </Tooltip>
                    :
                    <Card sx={{
                        backgroundColor: 'common.white',
                        borderRadius: '10px',
                        py: 0.7,
                        px: 2,
                        outline: 'solid',
                        outlineWidth: '0.15rem',
                        outlineColor: `${color}.main`,
                        boxShadow: 'none',
                    }}>
                        <Typography variant="cardSubheader" color={color} >{props.category}</Typography>
                    </Card>
            }
        </>
    )
}
