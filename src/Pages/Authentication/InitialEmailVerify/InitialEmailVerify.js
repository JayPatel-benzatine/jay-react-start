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
import LockIcon from "../../../assets/Icons/lockIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import useAuthentication from "../../../hooks/useAuthentication";
import { useTranslation } from "react-i18next";

const InitialEmailVerify = ({ darkMode }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  let { email, token } = useParams();
  //console.log(`${email}  ${token}`);

  const navigate = useNavigate();
  const { authLoader, authError, handleInitialEmailVerification } =
    useAuthentication();

  const check = () => {
    if (email !== "" && token !== "-1") {
      const values = { email: email, verificationCode: token };
      //console.log("called...");
      //console.log(navigate);

      const res = handleInitialEmailVerification(values, navigate);
      //console.log(`iii ${JSON.stringify(res)}`);
    }
  };
  useEffect(() => {
    check();
  }, [email]);
  const formik = useFormik({
    initialValues: {
      verificationCode: token !== "-1" ? token : "",
      email: email,
    },
    validationSchema: Yup.object({
      verificationCode: Yup.number()
        .typeError("Verification code must be a number")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const res = handleInitialEmailVerification(values, navigate);
      //console.log(`iii ${JSON.stringify(res)}`);
    },
  });

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
              component="form"
              onSubmit={formik.handleSubmit}
              color={darkMode ? "#ffffff" : "#121212"}
              width="100%"
            >
              <Typography mt={1} variant="h3" fontWeight={600}>
                {t("VERIFY_EMAIL")}
              </Typography>
              <Typography
                mt={1}
                variant="subtitle1"
                fontSize={18}
                color="GrayText"
              >
                enter the verification code we just send you
              </Typography>
              <Stack mt={5} direction="column">
                <TextField
                  variant="outlined"
                  placeholder="111111"
                  label="Verification Code"
                  id="verificationCode"
                  named="verificationCode"
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
                        {<img src={LockIcon} alt="..." />}
                      </InputAdornment>
                    ),
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.verificationCode}
                  autoComplete="off"
                />
                {formik.touched.verificationCode &&
                  formik.errors.verificationCode ? (
                    <Typography
                      mt={1}
                      component="p"
                      color="error"
                      variant="caption"
                    >
                      {formik.errors.verificationCode}
                    </Typography>
                  ) : null}
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
              <Box mt={2}>
                {authLoader ? (
                  <LoadingButton loading fullWidth>
                    Submit
                  </LoadingButton>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="blue"
                    fullWidth
                    sx={{ py: 1.5, fontSize: "1rem" }}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            </Box>
          </Container>
        </Stack>
      ) : (
        <Box px={3} py={3} mt={5}>
          <Box color={darkMode ? "#ffffff" : "#121212"} width="100%" onSubmit={formik.handleSubmit}   component="form">
            <Typography mt={1} variant="h4" fontWeight={600}>
              {t("VERIFY_EMAIL")}
            </Typography>
            <Typography
              mt={1}
              variant="subtitle1"
              fontSize={18}
              color="GrayText"
            >
              enter the verification code we just send you
            </Typography>
            <Stack mt={5} direction="column" gap={4}>
              <TextField
                variant="outlined"
                placeholder="111111"
                label="Verification Code"
                id="verificationCode"
                named="verificationCode"
                color="pink"
                autoFocus
                fullWidth
                InputProps={{
                  classes: {
                    input: `${darkMode ? "inputFieldAuth" : "inputFieldLight"}`,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      {<img src={LockIcon} alt="..." />}
                    </InputAdornment>
                  ),
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.verificationCode}
                autoComplete="off"
              />
            </Stack>
            <Box mt={4}>
              {authLoader ? (
                <LoadingButton loading fullWidth>
                  Submit
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="blue"
                  fullWidth
                  sx={{ py: 1.5, fontSize: "1rem" }}
                >
                  Submit
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default InitialEmailVerify;
