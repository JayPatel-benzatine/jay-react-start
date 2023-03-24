import React, { useEffect } from "react";
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

import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthentication from "../../../hooks/useAuthentication";

import AtIcon from "../../../assets/Icons/atIcon.svg";
import { useNavigate } from "react-router-dom";
import MetaContent from "../../../Meta/MetaContent";
import { useTranslation } from "react-i18next";

const VerifyEmailPage = ({ darkMode }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const {
    handleResetPassword,
    verifyEmailValidation,
    clearVerifyEmailValidation,
  } = useAuthentication();

  useEffect(() => {
    if (
      verifyEmailValidation.error !== "" ||
      verifyEmailValidation.success !== ""
    ) {
      clearVerifyEmailValidation();
      // window.location.reload();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter a valid email").required("Required"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      //console.log(values);
      handleResetPassword(values.email, navigate);
    },
  });

  return (
    <React.Fragment>
      <MetaContent page="verify_email" />
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
              component="form"
              color={darkMode ? "#ffffff" : "#121212"}
              width="100%"
              onSubmit={formik.handleSubmit}
            >
              <Typography variant="h5" fontWeight={300}>
                {t("FORGOT_PASSWORD")}.
              </Typography>
              <Typography mt={1} variant="h3" fontWeight={600}>
                {t("VERIFY_EMAIL")}
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
                {verifyEmailValidation.error ? (
                  <Typography
                    mt={1}
                    component="p"
                    color="error"
                    variant="caption"
                    text-overflow="ellipsis"
                  >
                    {verifyEmailValidation.error}
                  </Typography>
                ) : null}
                {verifyEmailValidation.success ? (
                  <Typography
                    mt={1}
                    component="p"
                    color="#01D4FA"
                    variant="caption"
                  >
                    {verifyEmailValidation.success}
                  </Typography>
                ) : null}
              </Stack>
              <Box mt={4}>
                <Button
                  onClick={() => {
                    //console.log("ss");
                    // navigate('/authentication/sign-in');
                  }}
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
          </Container>
        </Stack>
      ) : (
        <Box px={3} py={3} mt={5}>
          <Box
            color={darkMode ? "#ffffff" : "#121212"}
            width="100%"
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Typography variant="h6" fontWeight={300}>
              {t("FORGOT_PASSWORD")}.
            </Typography>
            <Typography mt={1} variant="h4" fontWeight={600}>
              {t("VERIFY_EMAIL")}
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
                    input: `${darkMode ? "inputFieldAuth" : "inputFieldLight"}`,
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
              {verifyEmailValidation.error ? (
                <Typography
                  mt={1}
                  component="p"
                  color="error"
                  variant="caption"
                >
                  {verifyEmailValidation.error}
                </Typography>
              ) : null}
              {verifyEmailValidation.success ? (
                <Typography
                  mt={1}
                  component="p"
                  color="#01D4FA"
                  variant="caption"
                >
                  {verifyEmailValidation.success}
                </Typography>
              ) : null}
            </Stack>
            <Box mt={4}>
              <Button
                // onClick={() => navigate('/authentication/set-password')}
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

export default VerifyEmailPage;
