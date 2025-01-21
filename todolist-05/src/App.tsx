import './App.css'
import {useState} from 'react'
import {TodolistItem} from './TodolistItem'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TasksState = {
    [key: string]: Task[]
}

export const App = () => {
    const todolistId1 = crypto.randomUUID()
    const todolistId2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: crypto.randomUUID(), title: 'Rest API', isDone: true},
            {id: crypto.randomUUID(), title: 'GraphQL', isDone: false},
        ],
    })

    const deleteTask = (todolistID: string, taskId: string) => {
        if (!tasks[todolistID]) return // Проверяем, существует ли такой `todolistID`
        const updatedTasks = {
            ...tasks,
            [todolistID]: tasks[todolistID].filter(task => task.id !== taskId) // Фильтруем задачи
        }
        setTasks(updatedTasks)
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: crypto.randomUUID(), title, isDone: false}
        const updatedTasks = {
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        }
        setTasks(updatedTasks)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const updatedTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(task =>
                task.id === taskId ? {...task, isDone} : task) // Изменяем статус только нужной задачи
        }
        setTasks(updatedTasks) // Обновляем состояние, сохраняя структуру
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return <div className="app">
        {todolists.map(todolist => {
                let todolistTasks = tasks[todolist.id] || [] // Если задач нет, вернуть пустой массив
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }
                return (
                    <TodolistItem key={todolist.id}
                                  todolist={todolist}
                                  tasks={filteredTasks}
                                  deleteTask={deleteTask}
                                  changeFilter={changeFilter}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                                  deleteTodolist={deleteTodolist}
                    />
                )
            }
        )}
    </div>
}