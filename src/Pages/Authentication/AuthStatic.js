import React from "react";
import { Box } from "@mui/system";

// Logo
import MainLogo from "../../assets/logo01.png";
import MainLogoDark from "../../assets/logo02.png";
import { Stack, Typography } from "@mui/material";

// styles
import styles from "./AuthStyles.module.css";
import { useTranslation } from "react-i18next";

const AuthStatic = ({ darkMode }) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <img
              src={darkMode ? MainLogo : MainLogoDark}
              alt="Main Logo"
              style={{ display: "block", height: "100px", width: "360px" }}
            />

            <Typography variant="h5" fontWeight={300} mt={2}>
              {t("NFT_MARKETPLACE")}
            </Typography>
          </Box>

          {/* <Box mt={10}>
            <Typography variant="h2" textAlign="center" fontWeight={500}>
              Collect & Sell <br /> Your{" "}
              <Typography
                color={darkMode ? "#fff" : "#01d4fa"}
                className={
                  darkMode
                    ? styles.heroGradientText
                    : styles.heroGradientTextlight
                }
                component="span"
                variant="h2"
                fontWeight={600}
                lineHeight={2}
              >
                Awesome
              </Typography>{" "}
              NFTs
            </Typography>
          </Box> */}

        </Box>
      </Stack>
    </Box>
  );
};

export default AuthStatic;
