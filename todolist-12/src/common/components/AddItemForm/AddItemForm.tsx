import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

export const AddItemForm = ({addItem}: { addItem: (title: string) => void }) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            addItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       value={title}
                       size={'small'}
                       error={!!error}
                       helperText={error}
                       onChange={changeTitleHandler}
                       onKeyDown={createItemOnEnterHandler}/>
            <IconButton onClick={createItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
}