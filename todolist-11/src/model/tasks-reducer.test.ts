import {beforeEach, expect, test} from 'vitest'
import {createTodolistAC, deleteTodolistAC, todolistsReducer} from "./todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from "./tasks-reducer.ts";
import {Tasks, Todolist} from "../app/App.tsx";

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC('New todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(startState, deleteTaskAC({todolistId: 'todolistId2', taskId: '2'}))

    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false},
        ],
    })
})

test('correct task should be created at correct array', () => {
    const endState = tasksReducer(startState, createTaskAC({
        todolistId: 'todolistId2',
        title: 'juice'
    }))

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe('juice')
    expect(endState.todolistId2[0].isDone).toBe(false)
})

test('correct task should change its status', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC({
        todolistId: 'todolistId2',
        taskId: '2',
        isDone: false
    }))

    expect(endState.todolistId2[1].isDone).toBe(false)
    expect(endState.todolistId2.length).toBe(3)
})

test('correct task should change its title', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC({
        todolistId: 'todolistId2',
        taskId: '2',
        title: 'React'
    }))

    expect(endState.todolistId2[1].title).toBe('React')
    expect(endState.todolistId2.length).toBe(3)
})

test('ids should be equals', () => {
    const startTasksState: TasksState = {}
    const startTodolistsState: Todolist[] = []

    const action = createTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})