import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import axios from "axios";

type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

const TaskStatuses = {
    New: 0,
    Completed: 2
}

type FieldError = {
    error: string
    field: string
}

type Response<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: D
    }
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: `Bearer cecbe08c-0787-4e8e-8ff1-a2fa4b254cd7`
            }
        }).then(res => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach(tl =>
                axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                    headers: {
                        Authorization: `Bearer cecbe08c-0787-4e8e-8ff1-a2fa4b254cd7`,
                        'API-KEY': '5d2e37f1-395e-4105-b8eb-f1ffe52ce33f'
                    }
                }).then(res => {
                    const tasksForTodolist = res.data.items
                    setTasks(prevTasks => ({...prevTasks, [tl.id]: tasksForTodolist}))
                })
            )
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios.post<Response<Todolist>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
            headers: {
                Authorization: `Bearer cecbe08c-0787-4e8e-8ff1-a2fa4b254cd7`,
                'API-KEY': '5d2e37f1-395e-4105-b8eb-f1ffe52ce33f'
            }
        }).then(res => {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
            setTasks({...tasks, [newTodolist.id]: []})
        })
    }

    const removeTodolistHandler = (id: string) => {
        axios.delete<Response<Todolist>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: `Bearer cecbe08c-0787-4e8e-8ff1-a2fa4b254cd7`,
                'API-KEY': '5d2e37f1-395e-4105-b8eb-f1ffe52ce33f'
            }
        }).then(() => {
            setTodolists(todolists.filter(tl => tl.id !== id))
        })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        axios.put<Response<Todolist>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, {
            headers: {
                Authorization: `Bearer cecbe08c-0787-4e8e-8ff1-a2fa4b254cd7`,
                'API-KEY': '5d2e37f1-395e-4105-b8eb-f1ffe52ce33f'
            }
        }).then(() => {
            setTodolists(todolists.map(tl => tl.id === id ? {...tl, title} : tl))
        })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<Response<DomainTask>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, {
            headers: {
                Authorization: `Bearer cecbe08c-0787-4e8e-8ff1-a2fa4b254cd7`,
                'API-KEY': '5d2e37f1-395e-4105-b8eb-f1ffe52ce33f'
            }
        }).then(res => {
            const newTask = res.data.data.item
            setTasks(prevTasks => ({...prevTasks, [todolistId]: [newTask, ...(prevTasks[todolistId])]}))
        })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer cecbe08c-0787-4e8e-8ff1-a2fa4b254cd7`,
                'API-KEY': '5d2e37f1-395e-4105-b8eb-f1ffe52ce33f'
            }
        }).then(() => {
            setTasks(prevTasks => ({...prevTasks, [todolistId]: prevTasks[todolistId].filter(t => t.id !== taskId)}))
        })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        const model: DomainTask = {
            ...task,
            status
        }
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, {
            headers: {
                Authorization: `Bearer cecbe08c-0787-4e8e-8ff1-a2fa4b254cd7`,
                'API-KEY': '5d2e37f1-395e-4105-b8eb-f1ffe52ce33f'
            }
        }).then(() => {
            setTasks(prevTasks => ({
                ...prevTasks,
                [task.todoListId]: prevTasks[task.todoListId].map(t => t.id === task.id ? {...task, ...model} : t)
            }))
        })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {
        const model: DomainTask = {
            ...task,
            title
        }
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, {
            headers: {
                Authorization: `Bearer cecbe08c-0787-4e8e-8ff1-a2fa4b254cd7`,
                'API-KEY': '5d2e37f1-395e-4105-b8eb-f1ffe52ce33f'
            }
        }).then(() => {
            setTasks(prevTasks => ({
                ...prevTasks,
                [task.todoListId]: prevTasks[task.todoListId].map(t => t.id === task.id ? {...t, ...model} : t)
            }))

        })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl: Todolist) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === TaskStatuses.Completed}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}