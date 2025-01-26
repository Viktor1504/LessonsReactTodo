import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, deleteTodolistAC, TodolistType} from "../../../../../../model/todolists-reducer.ts";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch.ts";

export const TodolistTitle = ({todolist}: { todolist: TodolistType }) => {
    const dispatch = useAppDispatch();

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC(todolist.id))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id: todolist.id, title}))
    }

    return (
        <div className={'container'}>
            <h3>
                <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
            </h3>
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}