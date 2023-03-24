import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LockIcon from "../../../assets/Icons/lockIcon.svg";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import useAuthentication from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const SetPasswordPage = ({ darkMode }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isCnfrmPasswordVisible, setCnfrmPasswordVisible] = useState(false);
  const { token } = useParams();
  //console.log(token);
  const { handleResetPasswordChangePassword, verifyfillPassword } =
    useAuthentication();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password doesn't match"
      ),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      //console.log(values);
      handleResetPasswordChangePassword(
        values.password,
        values.confirmPassword,
        token,
        navigate
      );

      //function to change pass will be called
    },
  });

  const changeVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const changeVisibilityCnfrm = () => {
    setCnfrmPasswordVisible(!isCnfrmPasswordVisible);
  };
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {!isMobile ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          px={5}
        >
          <Container>
            <Box
              onSubmit={formik.handleSubmit}
              component="form"
              color={darkMode ? "#ffffff" : "#121212"}
              width="100%"
            >
              <Typography variant="h5" fontWeight={300}>
                {t("FORGOT_PASSWORD")}.
              </Typography>
              <Typography mt={1} variant="h3" fontWeight={600}>
                {t("SET_PASSWORD")}
              </Typography>
              <Typography
                mt={1}
                variant="subtitle1"
                fontSize={18}
                color="GrayText"
              >
                {t("ENTER_REGISTERED_EMAIL_ADDRESS")}
              </Typography>
              <Stack mt={5} direction="column" gap={4}>
                <TextField
                  variant="outlined"
                  placeholder="************"
                  type={isPasswordVisible ? "text" : "password"}
                  label="Password"
                  color="pink"
                  id="password"
                  name="password"
                  autoFocus
                  fullWidth
                  InputProps={{
                    classes: {
                      input: `${
                        darkMode ? "inputFieldAuth" : "inputFieldAuthLight"
                      }`,
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ cursor: "pointer" }}
                        onClick={() => changeVisibility()}
                      >
                        {!isPasswordVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  autoComplete="off"
                />
                {formik.touched.password && formik.errors.password ? (
                  <Typography
                    mt={1}
                    component="p"
                    color="error"
                    variant="caption"
                  >
                    {formik.errors.password}
                  </Typography>
                ) : null}

                <TextField
                  variant="outlined"
                  placeholder="************"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isCnfrmPasswordVisible ? "text" : "password"}
                  label="Confirm Password"
                  color="pink"
                  autoFocus
                  fullWidth
                  InputProps={{
                    classes: {
                      input: `${
                        darkMode ? "inputFieldAuth" : "inputFieldAuthLight"
                      }`,
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ cursor: "pointer" }}
                        onClick={() => changeVisibilityCnfrm()}
                      >
                        {!isCnfrmPasswordVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  autoComplete="off"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <Typography
                      mt={1}
                      component="p"
                      color="error"
                      variant="caption"
                    >
                      {formik.errors.confirmPassword}
                    </Typography>
                  ) : null}
                {verifyfillPassword.error ? (
                  <Typography
                    mt={1}
                    component="p"
                    color="error"
                    variant="caption"
                  >
                    {verifyfillPassword.error}
                  </Typography>
                ) : null}
                {verifyfillPassword.success ? (
                  <Typography
                    mt={1}
                    component="p"
                    color="#01D4FA"
                    variant="caption"
                  >
                    {verifyfillPassword.success}
                  </Typography>
                ) : null}
              </Stack>
              <Box mt={4}>
                <Button
                  onClick={() => console.log("change password submitted...")}
                  variant="contained"
                  color="blue"
                  fullWidth
                  type="submit"
                  sx={{ py: 1.5, fontSize: "1rem" }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Container>
        </Stack>
      ) : (
        <Box px={3} py={3}>
          <Box
            color={darkMode ? "#ffffff" : "#121212"}
            width="100%"
            onSubmit={formik.handleSubmit}
            component="form"
          >
            <Typography variant="h6" fontWeight={300}>
              {t("FORGOT_PASSWORD")}.
            </Typography>
            <Typography mt={1} variant="h4" fontWeight={600}>
              {t("SET_PASSWORD")}
            </Typography>
            <Typography
              mt={1}
              variant="subtitle1"
              fontSize={18}
              color="GrayText"
            >
              {t("ENTER_REGISTERED_EMAIL_ADDRESS")}
            </Typography>
            <Stack mt={5} direction="column" gap={4}>
              <TextField
                variant="outlined"
                placeholder="Enter password"
                label="Password"
                type={isPasswordVisible ? "text" : "password"}
                color="pink"
                id="password"
                name="password"
                autoFocus
                fullWidth
                InputProps={{
                  classes: {
                    input: `${darkMode ? "inputFieldAuth" : "inputFieldLight"}`,
                  },
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ cursor: "pointer" }}
                      onClick={() => changeVisibility()}
                    >
                      {!isPasswordVisible ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                autoComplete="off"
              />
              {formik.touched.password && formik.errors.password ? (
                <Typography
                  mt={1}
                  component="p"
                  color="error"
                  variant="caption"
                >
                  {formik.errors.password}
                </Typography>
              ) : null}
              <TextField
                variant="outlined"
                placeholder="Confirm Password"
                label="Confirm Password"
                color="pink"
                autoFocus
                type={isCnfrmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                fullWidth
                InputProps={{
                  classes: {
                    input: `${darkMode ? "inputFieldAuth" : "inputFieldLight"}`,
                  },
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ cursor: "pointer" }}
                      onClick={() => changeVisibilityCnfrm()}
                    >
                      {!isCnfrmPasswordVisible ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                autoComplete="off"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <Typography
                  mt={1}
                  component="p"
                  color="error"
                  variant="caption"
                >
                  {formik.errors.confirmPassword}
                </Typography>
              ) : null}
              {verifyfillPassword.error ? (
                <Typography
                  mt={1}
                  component="p"
                  color="error"
                  variant="caption"
                >
                  {verifyfillPassword.error}
                </Typography>
              ) : null}
              {verifyfillPassword.success ? (
                <Typography
                  mt={1}
                  component="p"
                  color="#01D4FA"
                  variant="caption"
                >
                  {verifyfillPassword.success}
                </Typography>
              ) : null}
            </Stack>
            <Box mt={4}>
              <Button
                variant="contained"
                color="blue"
                fullWidth
                type="submit"
                sx={{ py: 1.5, fontSize: "1rem" }}
              >
                Submit
              </Button>
            </Box>
            <Box mt={5}>
              <Typography variant="body1" textAlign="center">
                Having doubts?{" "}
                <Typography
                  onClick={() => window.history.back()}
                  color="blue"
                  component="span"
                  sx={{
                    textDecoration: "underline",
                    color: "#01D4FA",
                    cursor: "pointer",
                  }}
                >
                  {t("GO_BACK")}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default SetPasswordPage;
