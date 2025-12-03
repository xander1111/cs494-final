import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

import { Collapse, CircularProgress, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

import { Word } from "@/types/word";
import { UserWord } from "@/types/userWord";
import { useUser } from "@/contexts/userContext";

import StyledCard from "@/components/styledCard";
import StyledDivider from "@/components/styledDivider";
import StyledTextField from "@/components/styledTextField";

export function LetterPairCard(props: { letterPair: string, words: string[], color: 'primary' | 'secondary' | 'error' | 'success' }) {
    const user = useUser();

    const [expanded, setExpanded] = useState<boolean>(false);
    const [words, setWords] = useState<Word[] | undefined>()
    const [enteredWord, setEnteredWord] = useState<string>("")
    const [userWords, setUserWords] = useState<UserWord[] | undefined>()

    const validInput = useMemo(() => /^[a-zA-Z\d]+$/.test(enteredWord) || enteredWord.length == 0, [enteredWord])
    const getHelperText = useMemo(() => (validInput ? "" : "Words can only contain alphanumeric characters"), [validInput])

    function loadWords() {
        if (!words) {
            fetch(`/api/word?letter_pair=${props.letterPair}`)
                .then(data => data.json())
                .then((data: { words: Word[] }) => { setWords(data.words) })
        }
    }

    async function submitWord() {
        if (!enteredWord)
            return

        if (!validInput)
            return

        const word = {
            letter_pair: props.letterPair,
            word: enteredWord,
        } as Word

        setEnteredWord("")

        await fetch('/api/word', {
            method: 'POST',
            body: JSON.stringify({ word: word })
        })

        const data = await fetch(`/api/word?letter_pair=${props.letterPair}`)
        const newWords = await data.json() as { words: Word[] }
        setWords(newWords.words)
    }

    async function removeUsedWord(word: UserWord) {
        async function updateUsedWords() {
            setUserWords(undefined)

            const res = await fetch(`/api/user_word?letter_pair=${props.letterPair}`)
            const data = await res.json()

            console.log(data)
            setUserWords(data.userWords)
        }

        if (!user.user) {
            return
        }

        await fetch('/api/user_word', {
            method: 'DELETE',
            body: JSON.stringify({ userWord: word })
        })

        updateUsedWords()
    }

    async function addUsedWord(word: Word) {
        async function updateUsedWords() {
            setUserWords(undefined)

            const res = await fetch(`/api/user_word?letter_pair=${props.letterPair}`)
            const data = await res.json()

            console.log(data)
            setUserWords(data.userWords)
        }

        if (!user.user) {
            return
        }

        const newUserWord = {
            word: word,
            user_uuid: user.user.id,
        } as UserWord

        await fetch('/api/user_word', {
            method: 'POST',
            body: JSON.stringify({ userWord: newUserWord })
        })

        updateUsedWords()
    }

    useEffect(() => {
        async function updateUsedWords() {
            setUserWords(undefined)

            const res = await fetch(`/api/user_word?letter_pair=${props.letterPair}`)
            const data = await res.json()

            console.log(data)
            setUserWords(data.userWords)
        }

        if (!user.user) {
            return  // Don't make API calls that require the user to be logged in
        }

        updateUsedWords()
    }, [])

    return (
        <StyledCard sx={{ width: '100%', mb: 2 }}>
            <Stack direction='column' spacing={2}>

                <Stack direction='row' justifyContent='space-between' spacing={2} width='100%' >
                    <Stack alignItems='flex-start'>
                        <Typography variant="cardHeader" color={props.color}>{props.letterPair}</Typography>

                        {
                            user.user ?
                                userWords ?
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
                                            {
                                                userWords.length > 0 ?
                                                    userWords.map(userWord => userWord.word.word).join(", ")
                                                    :
                                                    "No words added"
                                            } <EditIcon sx={{ fontSize: 'inherit' }} />
                                        </Typography>
                                    </Tooltip>
                                    :
                                    <CircularProgress color={props.color} size='100%' sx={{ height: '100%', width: '100%' }} />
                                :
                                <Tooltip title="View words">
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
                                        View words
                                    </Typography>
                                </Tooltip>
                        }

                    </Stack>
                </Stack>

                <Collapse in={expanded} timeout='auto' sx={{ width: '100%' }} unmountOnExit>
                    <Stack direction='column' width='100%' spacing={2}>
                        <StyledDivider />
                        {
                            user.user ?
                                <Stack direction='row' width='100%' spacing={2} alignItems='stretch'>
                                    <Stack direction='column' spacing={2} width='100%'>
                                        <Stack direction='column' spacing={2}>
                                            {
                                                userWords ?
                                                    userWords.map((userWord, i) => (
                                                        <Typography key={i} variant='cardSubheader'>
                                                            {userWord.word.word}
                                                            <Tooltip title="Remove word">
                                                                <IconButton onClick={() => { removeUsedWord(userWord) }}>
                                                                    <BackspaceOutlinedIcon color='error' />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Typography>
                                                    ))
                                                    :
                                                    <CircularProgress color={props.color} />
                                            }
                                        </Stack>

                                    </Stack>

                                    <StyledDivider orientation='vertical' flexItem />

                                    <Stack direction='column' spacing={2} width='100%'>
                                        <Stack direction='row' spacing={2}>
                                            <StyledTextField
                                                label="Add a word"
                                                type='text'
                                                value={enteredWord}
                                                error={!validInput}
                                                helperText={getHelperText}
                                                onChange={e => { setEnteredWord(e.target.value) }}
                                                color={props.color}
                                            />
                                            <Tooltip title="Add word">
                                                <IconButton onClick={submitWord}>
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
                                                            <IconButton onClick={() => { addUsedWord(word) }}>
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
                                :
                                <Stack spacing={2}>
                                    <Stack spacing={1}>
                                        <Tooltip title="Click to log in">
                                            <Link href='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Typography>
                                                    Log in to set what algorithm you use, or add a new one
                                                </Typography>
                                            </Link>
                                        </Tooltip>
                                        <StyledDivider />
                                    </Stack>

                                    <Stack spacing={2}>
                                        {
                                            words ?
                                                words.map((word, i) => (
                                                    <Tooltip key={i} title="Log in to select words">
                                                        <Link href='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                                                            <Typography variant='cardSubheader'>
                                                                {word.word}
                                                            </Typography>
                                                        </Link>
                                                    </Tooltip>
                                                ))
                                                :
                                                <CircularProgress color={props.color} />
                                        }
                                    </Stack>
                                </Stack>
                        }
                    </Stack>
                </Collapse>

            </Stack >
        </StyledCard >
    )
}
