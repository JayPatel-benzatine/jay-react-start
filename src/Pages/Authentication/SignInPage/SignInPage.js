import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Container,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AtIcon from "../../../assets/Icons/atIcon.svg";
import LockIcon from "../../../assets/Icons/lockIcon.svg";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate, useParams  } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthentication from "../../../hooks/useAuthentication";
import { LoadingButton } from "@mui/lab";
import MetaContent from "../../../Meta/MetaContent";

import CustomSnackBar from "../../../components/SnackBar/SnackBar";

import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";

const SignInPage = ({ darkMode }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarMode, setsnackBarMode] = useState("success");
  const [loadButtonG, setloadButtonG] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const { handleSignInUser, authError, authLoader, GoogleSignIn } =
    useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      setloadButtonG(true);
      const callbackURL = window.location.search.split("=")[1];
      const resp = await GoogleSignIn(
        res.access_token,
        navigate,
        location,
        callbackURL
      );
      if (resp && resp.response?.status == 400) {
        //console.log(resp.response);
        setSnackOpen(true);
        setloadButtonG(false);
        setsnackBarMode("error");
        return setSnackBarMessage(resp.response.data.message);
      }
      setloadButtonG(false);
    },
    onError: (err) => console.log(err),
    // flow: 'auth-code',
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter a valid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      //console.log(values);
      const callbackURL = window.location.search.split("=")[1];

      handleSignInUser(
        values.email,
        values.password,
        navigate,
        location,
        callbackURL
      );
    },
  });
  useEffect(() => {
    if (
      authError === "Cannot Login Email Not Verified, OTP send to your email"
    ) {
      //console.log("dd");
      navigate(`/activate/${formik.values.email}/-1`);
    }
  }, [authError]);

  useEffect(() => {
    let a = window.location.search;

    if (a == "?ref=change-email") {
      setSnackOpen(true);
      setsnackBarMode("info")
      setSnackBarMessage("Email changed. Login witn new credentials.");
    }
  }, []);


  const changeVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <React.Fragment>
      <MetaContent page="sign_in" />
      {!isMobile ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          px={5}
          backgroundColor={!darkMode ? "azure" : "black"}
          sx={{
            backdropFilter: "blur(20px)",
          }}
        >
          <Container>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              color={darkMode ? "#ffffff" : "#121212"}
              width="100%"
            >
              <Typography variant="h4" fontWeight={500} textAlign="center">
                {t("WELCOME_TO_MINTO")}
              </Typography>
              <Stack mt={8} direction="column" gap={4}>
                <Box>
                  <TextField
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="email"
                    variant="outlined"
                    placeholder="example@email.com"
                    label="Email"
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
                        <InputAdornment position="end">
                          {<img src={AtIcon} alt="..." />}
                        </InputAdornment>
                      ),
                    }}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Typography
                      mt={1}
                      component="p"
                      color="error"
                      variant="caption"
                    >
                      {formik.errors.email}
                    </Typography>
                  ) : null}
                </Box>
                <Box>
                  <TextField
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    variant="outlined"
                    placeholder="Enter your top secret password"
                    label="Password"
                    color="pink"
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
                    {...formik.getFieldProps("password")}
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
                </Box>
              </Stack>
              <Stack>
                {authError ? (
                  <Typography
                    mt={1}
                    component="p"
                    color="error"
                    variant="caption"
                  >
                    {authError}
                  </Typography>
                ) : null}
              </Stack>
              <Box mt={4}>
                {authLoader ? (
                  <LoadingButton
                    loading
                    type="submit"
                    variant="contained"
                    color="blue"
                    fullWidth
                    sx={{ py: 1.5, fontSize: "1rem" }}
                  >
                    {t("LOGIN")}
                  </LoadingButton>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="blue"
                    fullWidth
                    sx={{ py: 1.5, fontSize: "1rem" }}
                  >
                    {t("LOGIN")}
                  </Button>
                )}
                <Button
                  onClick={() => {
                    navigate("/authentication/verify-email");
                  }}
                  variant="text"
                  fullWidth
                  sx={{ mt: 1, py: 1.5, fontSize: "1rem" }}
                >
                  <Typography
                    color="secondary"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {t("FORGOT_PASSWORD")}
                  </Typography>
                </Button>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={3}
                >
                  <Box sx={{ width: "50%" }}>
                    <Divider />
                  </Box>
                  <Typography component="p" variant="body1">
                    Or
                  </Typography>
                  <Box sx={{ width: "50%" }}>
                    <Divider />
                  </Box>
                </Stack>

                {loadButtonG ? (
                  <LoadingButton
                    loading
                    variant="contained"
                    color="blue"
                    fullWidth
                    sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
                  >
                    {t("LOGIN")}
                  </LoadingButton>
                ) : (
                  <Button
                    onClick={loginGoogle}
                    color="secondary"
                    sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
                    fullWidth
                    variant="contained"
                    startIcon={<FcGoogle size={30} />}
                  >
                    Sign in with Google
                  </Button>
                )}
              </Box>
              <Box mt={5}>
                <Typography variant="body1" textAlign="center">
                  Don't have an account?{" "}
                  <Typography
                    onClick={() => navigate("/authentication/sign-up")}
                    color="blue"
                    component="span"
                    sx={{
                      textDecoration: "underline",
                      color: "#01D4FA",
                      cursor: "pointer",
                    }}
                  >
                    {t("SIGNUP")}
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Container>
        </Stack>
      ) : (
        <Box px={3} py={3}>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            color={darkMode ? "#ffffff" : "#121212"}
            width="100%"
          >
            <Typography variant="h5" fontWeight={500} textAlign="center">
              {t("WELCOME_TO_MINTO")}
            </Typography>
            <Stack mt={5} direction="column" gap={4}>
              <Box>
                <TextField
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="email"
                  variant="outlined"
                  placeholder="example@email.com"
                  label="Email"
                  color="pink"
                  autoFocus
                  fullWidth
                  InputProps={{
                    classes: {
                      input: `${
                        darkMode ? "inputFieldAuth" : "inputFieldLight"
                      }`,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        {<img src={AtIcon} alt="..." />}
                      </InputAdornment>
                    ),
                  }}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Typography
                    mt={1}
                    component="p"
                    color="error"
                    variant="caption"
                  >
                    {formik.errors.email}
                  </Typography>
                ) : null}
              </Box>
              <Box>
                <TextField
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  variant="outlined"
                  placeholder="Enter your top secret password"
                  label="Password"
                  color="pink"
                  fullWidth
                  InputProps={{
                    classes: {
                      input: `${
                        darkMode ? "inputFieldAuth" : "inputFieldLight"
                      }`,
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
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
                  {...formik.getFieldProps("password")}
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
              </Box>
            </Stack>
            <Stack>
              {authError ? (
                <Typography
                  mt={1}
                  component="p"
                  color="error"
                  variant="caption"
                >
                  {authError}
                </Typography>
              ) : null}
            </Stack>
            <Box mt={4}>
              {authLoader ? (
                <LoadingButton
                  loading
                  type="submit"
                  variant="contained"
                  color="blue"
                  fullWidth
                  sx={{ py: 1.5, fontSize: "1rem" }}
                >
                  {t("LOGIN")}
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="blue"
                  fullWidth
                  sx={{ py: 1.5, fontSize: "1rem" }}
                >
                  {t("LOGIN")}
                </Button>
              )}
              <Button
                onClick={() => navigate("/authentication/verify-email")}
                variant="text"
                fullWidth
                sx={{ mt: 1, py: 1.5, fontSize: "1rem" }}
              >
                <Typography
                  color="secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {t("FORGOT_PASSWORD")}
                </Typography>
              </Button>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={3}
              >
                <Box sx={{ width: "50%" }}>
                  <Divider />
                </Box>
                <Typography component="p" variant="body1">
                  Or
                </Typography>
                <Box sx={{ width: "50%" }}>
                  <Divider />
                </Box>
              </Stack>

              {loadButtonG ? (
                <LoadingButton
                  loading
                  variant="contained"
                  color="blue"
                  fullWidth
                  sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
                >
                  {t("LOGIN")}
                </LoadingButton>
              ) : (
                <Button
                  onClick={loginGoogle}
                  color="secondary"
                  sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
                  fullWidth
                  variant="contained"
                  startIcon={<FcGoogle size={30} />}
                >
                  Sign in with Google
                </Button>
              )}
            </Box>
            <Box mt={5}>
              <Typography variant="body1" textAlign="center">
                Don't have an account?{" "}
                <Typography
                  onClick={() => navigate("/authentication/sign-up")}
                  color="blue"
                  component="span"
                  sx={{
                    textDecoration: "underline",
                    color: "#01D4FA",
                    cursor: "pointer",
                  }}
                >
                  {t("SIGNUP")}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <CustomSnackBar
        darkMode={darkMode}
        propsOpen={snackOpen}
        message={snackBarMessage}
        onClose={() => {
          setSnackOpen(false);
        }}
        mode={snackBarMode}
      />
    </React.Fragment>
  );
};

export default SignInPage;
