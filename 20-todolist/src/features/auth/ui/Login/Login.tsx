import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { ResultCode } from "common/enums"
import { useAppDispatch } from "common/hooks"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { setIsLoggedIn } from "../../../../app/appSlice"
import { useLoginMutation } from "../../api/authAPI"
import { LoginArgs } from "../../api/authAPI.types"
import { styled } from "@mui/material/styles"

// Стилизованный контейнер для формы
const FormContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  maxWidth: "400px",
  width: "100%",
}))

export const Login = () => {
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>({ defaultValues: { email: "", password: "", rememberMe: false } })

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    login(data)
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          localStorage.setItem("sn-token", res.data.data.token)
        }
      })
      .finally(() => {
        reset()
      })
  }

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <FormContainer item>
        <FormControl component="form" onSubmit={handleSubmit(onSubmit)} fullWidth>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Incorrect email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              type="password"
              label="Password"
              margin="normal"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password must be at least 3 characters long",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                />
              }
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </FormContainer>
    </Grid>
  )
}
