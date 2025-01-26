import {AddItemForm} from '../../../../../common/components/AddItemForm/AddItemForm.tsx'
import {TodolistType} from "../../../../../model/todolists-reducer.ts";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons.tsx";
import {Tasks} from "./Tasks/Tasks.tsx";
import {createTaskAC} from "../../../../../model/tasks-reducer.ts";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle.tsx";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch.ts";

export const Todolist = ({todolist}: { todolist: TodolistType }) => {
    const dispatch = useAppDispatch()

    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={createTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}