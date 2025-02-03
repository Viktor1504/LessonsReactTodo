import Fade from "@mui/material/Fade"
import { Typography } from "@mui/material"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { Link } from "react-router"

export const Page404 = () => {
  return (
    <Fade in={true} timeout={1000}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "250px", fontWeight: "bold", lineHeight: 1 }}>
          404
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "50px", textTransform: "uppercase", mb: 4 }}>
          Page Not Found
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{
            fontSize: "18px",
            padding: "10px 30px",
          }}
        >
          HOME
        </Button>
      </Container>
    </Fade>
  )
}
