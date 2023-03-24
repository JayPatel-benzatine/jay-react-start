import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientButtonPrimary = styled(Button)({
  color: "#ffffff",
  border: "none",
  background: "linear-gradient(91.93deg, #527AB8 1.75%, #6FA5F9 98.27%)",
  borderRadius: "10px",
  boxShadow: "none",
  padding: "8px 1.5rem",
  textTransform: "capitalize",
  "&:hover": {
    boxShadow: "none",
    background: "linear-gradient(91.93deg, #527AB8 98.27%, #6FA5F9 1.75%)",
  },
  "&:active": {
    boxShadow: "none",
    background: "linear-gradient(91.93deg, #527AB8 98.27%, #6FA5F9 1.75%)",
  },
  "&:focus": {
    background: "linear-gradient(91.93deg, #527AB8 98.27%, #6FA5F9 1.75%)",
  },
});
const GradientButtonSecondary = styled(Button)({
  color: "#ffffff",
  border: "none",
  background: "linear-gradient(91.95deg, #AE72D3 1.75%, #D086FD 98.13%)",
  borderRadius: "10px",
  boxShadow: "none",
  padding: "8px 1.5rem",
  textTransform: "capitalize",
  "&:hover": {
    boxShadow: "none",
    background: "linear-gradient(91.95deg, #AE72D3 98.13%, #D086FD 1.75%)",
  },
  "&:active": {
    boxShadow: "none",
    background: "linear-gradient(91.95deg, #AE72D3 98.13%, #D086FD 1.75%)",
  },
  "&:focus": {
    background: "linear-gradient(91.95deg, #AE72D3 98.13%, #D086FD 1.75%)",
  },
});

export { GradientButtonPrimary, GradientButtonSecondary };
