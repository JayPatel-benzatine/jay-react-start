import { createTheme } from "@mui/material";

const useCustomTheme = (darkMode) => {
  const customTheme = createTheme(
    darkMode
      ? {
          palette: {
            mode: "dark",
            primary: {
              main: "#121212",
            },
            secondary: {
              main: "#ffffff",
            },
            accent: {
              main: "#171C26",
            },
            pink: {
              main: "#E552FF",
            },
            blue: {
              main: "#01D4FA",
            },
            black: {
              main: "#040404",
            },
          },
          typography: {
            fontFamily: "'Poppins', sans-serif",
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
          },
          breakpoints: {
            values: {
              xs: 600,
              sm: 600,
              md: 900,
              lg: 1200,
              xl: 1536,
            },
          },
        }
      : {
          palette: {
            mode: "light",
            background: {
              default: "#ffffff",
            },
            primary: {
              main: "#ffffff",
            },
            secondary: {
              main: "#121212",
            },
            accent: {
              main: "#fff2f8",
            },
            pink: {
              main: "#E552FF",
            },
            blue: {
              main: "#01D4FA",
            },
            black: {
              main: "#FFFFFF",
            },
          },
          typography: {
            fontFamily: "'Poppins', sans-serif",
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
          },
          breakpoints: {
            values: {
              xs: 0,
              sm: 600,
              md: 900,
              lg: 1200,
              xl: 1536,
            },
          },
        }
  );

  return { customTheme };
};

export default useCustomTheme;
