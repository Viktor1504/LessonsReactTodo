import {TodolistType} from "../../../../../../model/todolists-reducer.ts";
import List from "@mui/material/List";
import {Task} from "./Task/Task.tsx";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector.ts";
import {selectTasks} from "../../../../model/tasksSelectors.ts";

export const Tasks = ({todolist}: { todolist: TodolistType }) => {
    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[todolist.id]
    let filteredTasks = todolistTasks
    if (todolist.filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (todolist.filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <List>
            {!filteredTasks || !filteredTasks.length ? (<p>Тасок нет</p>
            ) : (
                filteredTasks.map(task => {
                    return <Task key={task.id} todolist={todolist} task={task}/>
                })
            )
            }
        </List>
    )
}