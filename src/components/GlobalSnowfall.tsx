import Snowfall from "react-snowfall";
import { useTheme } from "@/components/ThemeProvider";

const GlobalSnowfall = () => {
  const { theme } = useTheme();

  return (
    <Snowfall
      color={theme === "dark" ? "rgba(54, 128, 67, 0.8)" : "rgba(0, 255, 157, 1.0)"}
      snowflakeCount={250}
      style={{ position: "fixed", width: "100vw", height: "100vh", zIndex: 0 }}
    />
  );
};

export default GlobalSnowfall;
