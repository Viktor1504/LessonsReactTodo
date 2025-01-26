import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolists/Todolist/Todolist.tsx";
import {useAppSelector} from "../../../common/hooks/useAppSelector.ts";
import {selectTodolists} from "../model/todolistsSelectors.ts";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists && todolists.map(todolist => {
                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist todolist={todolist}/>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}