import "./styles/index.css";
import "./styles/style.css";
import { createRoot } from "react-dom/client";
import App from "./App"; // Import your main App component
import AppProvider from "./Components/APP/AppProvider";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const root = createRoot(document.getElementById("root")); // Replace 'root' with your root element ID
root.render(
  <MantineProvider theme={theme}>
    <AppProvider>
      <App />
    </AppProvider>
  </MantineProvider>
);
