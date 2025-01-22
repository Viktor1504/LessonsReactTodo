import {useState} from "react";

export const EditableSpan = ({value, onChange}: { value: string; onChange: (title: string) => void }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(value)

    const turnEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    const onBlurHandler = () => {
        setIsEditMode(!isEditMode)
        onChange(title)
    }

    return (
        <>
            {isEditMode
                ? <input
                    autoFocus
                    value={title}
                    onBlur={onBlurHandler}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                : <span onDoubleClick={turnEditMode}>{title}</span>
            }
        </>
    )
}