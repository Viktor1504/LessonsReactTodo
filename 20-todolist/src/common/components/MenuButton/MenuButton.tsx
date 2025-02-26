import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"

type MenuButtonProps = {
  background?: string
}

export const MenuButton = styled(Button)<MenuButtonProps>(({ background, theme }) => ({
  minWidth: "110px",
  fontWeight: "bold",
  borderRadius: "8px", // Скругленные углы
  textTransform: "capitalize",
  margin: "0 10px",
  padding: "8px 24px",
  color: theme.palette.primary.contrastText,
  background: background || theme.palette.primary.main, // Однотонный фон или переданный цвет
  transition: "all 0.3s ease", // Плавные переходы
  border: `2px solid ${theme.palette.primary.dark}`, // Граница для акцента
  "&:hover": {
    background: background || theme.palette.primary.dark, // Изменение фона при наведении
    color: theme.palette.primary.light, // Изменение цвета текста при наведении
    transform: "translateY(-2px)", // Легкий подъем при наведении
  },
  "&:active": {
    transform: "translateY(0)", // Возврат в исходное положение при нажатии
  },
}))