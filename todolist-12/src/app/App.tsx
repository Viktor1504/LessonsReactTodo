import './App.css'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {getTheme} from "../common/theme/theme.ts";
import {Header} from "../common/components/Header/Header.tsx";
import {Main} from "./Main.tsx";
import Box from "@mui/material/Box";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectThemeMode} from "./appSelectors.ts";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Box display="flex" flexDirection="column" width="100vw">
                <Header/>
                <Main/>
            </Box>
        </ThemeProvider>
    )
}
