import Grid from "@mui/material/Grid2";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm.tsx";
import Container from "@mui/material/Container";
import {createTodolistAC} from "../model/todolists-reducer.ts";
import {Todolists} from "../features/todolists/ui/Todolists.tsx";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";

export const Main = () => {
    const dispatch = useAppDispatch();

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatch(action)
    }

    return (
        <Container fixed>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}