import React from "react";
import { Box } from "@mui/system";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideShadow from "../../assets/sideNavigationShadow.svg";
import AuthStatic from "./AuthStatic";

// Logo
import MainLogo from "../../assets/logo01.png";
import MainLogoLight from "../../assets/logo02.png";

// styles
import styles from "./AuthStyles.module.css";
import { useTranslation } from "react-i18next";

const AuthInterface = ({ darkMode }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      {!isMobile ? (
        <Box sx={{ width: "1300px", margin: "0 auto" }}>
          <Box
            // bgcolor={darkMode ? "#040404" : "#ffffff"}
            color={darkMode ? "#ffffff" : "#121212"}
          >
            <Box className={styles.parentBox} position={"relative"}>
              <Box sx={{ position: "fixed", top: "-45%", left: "-5%" }}>
                <img src={SideShadow} alt="Side Shadow" />
              </Box>
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  height="100vh"
                  gap={5}
                >
                  <Box width={"50%"}>
                    <AuthStatic darkMode={darkMode} />
                  </Box>
                  <Box
                    zIndex={10}
                    minHeight="100vh"
                    sx={{ overflowY: "scroll" }}
                    width={"50%"}
                    className={styles.mainBoxStyle}
                  >
                    <Outlet />
                  </Box>
                </Stack>
              </Box>
              <Box
                sx={{
                  position: "fixed",
                  bottom: "-55%",
                  right: "-2%",
                  transform: "rotate(180deg)",
                }}
              >
                <img src={SideShadow} alt="Side Shadow" />
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            py={3}
            bgcolor={darkMode ? "#040404" : "#ffffff"}
            color={darkMode ? "#ffffff" : "#121212"}
          >
            <Box className={styles.parentBox} position={"relative"}>
              <Box sx={{ position: "fixed", top: "-45%", left: "-5%" }}>
                <img src={SideShadow} alt="Side Shadow" />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <img
                  src={darkMode ? MainLogo : MainLogoLight}
                  alt="Main Logo"
                  style={{ display: "block", height: "90px", width: "200px" }}
                />
                <Typography variant="subtitle1" fontWeight={300} mt={2}>
                  {t("NFT_MARKETPLACE")}
                </Typography>
              </Box>
              <Box zIndex={10000} sx={{ overflowY: "scroll" }}>
                <Outlet />
              </Box>
              {/* <Box
                sx={{
                  position: "fixed",
                  bottom: "-55%",
                  right: "-2%",
                  transform: "rotate(180deg)",
                }}
              >
                <img src={SideShadow} alt="Side Shadow" />
              </Box> */}
            </Box>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default AuthInterface;
