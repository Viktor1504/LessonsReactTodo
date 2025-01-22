import TextField from '@mui/material/TextField'
import {type ChangeEvent, useState} from 'react'
import Typography from "@mui/material/Typography";

type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {
    const [title, setTitle] = useState(value)
    const [isEditMode, setIsEditMode] = useState(false)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {isEditMode ? (
                <TextField
                    variant={'outlined'}
                    value={title}
                    size={'small'}
                    onChange={changeTitle}
                    onBlur={turnOffEditMode}
                    autoFocus
                />
            ) : (
                <Typography
                    onDoubleClick={turnOnEditMode}
                    sx={{cursor: 'pointer', display: 'inline-block'}}
                >
                    {value}
                </Typography>
            )
            }
        </>
    )
}