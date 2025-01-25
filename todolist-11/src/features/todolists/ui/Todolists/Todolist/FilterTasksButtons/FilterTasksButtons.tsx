import {containerSx} from "../../../../../../Todolist.styles.ts";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {changeTodolistFilterAC, FilterValues, TodolistType} from "../../../../../../model/todolists-reducer.ts";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch.ts";

export const FilterTasksButtons = ({todolist}: { todolist: TodolistType }) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch()

    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))

    }

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterHandler('all')}>
                All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterHandler('active')}>
                Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterHandler('completed')}>
                Completed
            </Button>
        </Box>
    );
};

