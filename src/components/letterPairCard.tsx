import { useState } from "react";

import { Collapse, CircularProgress, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

import { Word } from "@/types/word";

import StyledCard from "@/components/styledCard";
import StyledDivider from "@/components/styledDivider";
import StyledTextField from "@/components/styledTextField";

export function LetterPairCard(props: { letterPair: string, words: string[], color: 'primary' | 'secondary' | 'error' | 'success' }) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [words, setWords] = useState<Word[] | undefined>()


    function loadWords() {
        if (!words) {
            fetch(`/api/word?letter_pair=${props.letterPair}`)
                .then(data => data.json())
                .then((data: { words: Word[] }) => { setWords(data.words) })
        }
    }

    return (
        <StyledCard sx={{ width: '100%', mb: 2 }}>
            <Stack direction='column' spacing={2}>

                <Stack direction='row' justifyContent='space-between' spacing={2} width='100%' >
                    <Stack alignItems='flex-start'>
                        <Typography variant="cardHeader" color={props.color}>{props.letterPair}</Typography>
                        <Tooltip title="Edit words">
                            <Typography
                                variant='cardSubheader'
                                color='common.black'
                                textAlign='center'
                                sx={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setExpanded(!expanded)
                                    loadWords()
                                }}
                            >
                                {props.words.join(", ")} <EditIcon sx={{ fontSize: 'inherit' }} />
                            </Typography>
                        </Tooltip>
                    </Stack>
                </Stack>

                <Collapse in={expanded} timeout='auto' sx={{ width: '100%' }} unmountOnExit>
                    <Stack direction='column' width='100%' spacing={2}>
                        <StyledDivider />
                        <Stack direction='row' width='100%' spacing={2} alignItems='stretch'>
                            <Stack direction='column' spacing={2} width='100%'>
                                <Stack direction='column' spacing={2}>
                                    <Typography variant='cardSubheader'>
                                        Example word 1
                                        <Tooltip title="Remove word">
                                            <IconButton>
                                                <BackspaceOutlinedIcon color='error' />
                                            </IconButton>
                                        </Tooltip>
                                    </Typography>

                                    <Typography variant='cardSubheader'>
                                        Example word 2
                                        <Tooltip title="Remove word">
                                            <IconButton>
                                                <BackspaceOutlinedIcon color='error' />
                                            </IconButton>
                                        </Tooltip>
                                    </Typography>
                                </Stack>

                            </Stack>

                            <StyledDivider orientation='vertical' flexItem />

                            <Stack direction='column' spacing={2} width='100%'>
                                <Stack direction='row' spacing={2}>
                                    <StyledTextField label="Add a word" type='text' onChange={() => { }} color={props.color} />
                                    <Tooltip title="Add word">
                                        <IconButton>
                                            <AddIcon color='success' />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                                {
                                    words ?
                                        words.map((word, i) => (
                                            <Typography key={i} variant='cardSubheader'>
                                                {word.word}
                                                <Tooltip title="Add word">
                                                    <IconButton>
                                                        <AddIcon color='success' />
                                                    </IconButton>
                                                </Tooltip>
                                            </Typography>

                                        ))
                                        :
                                        <CircularProgress color={props.color} />
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                </Collapse>

            </Stack >
        </StyledCard >
    )
}
