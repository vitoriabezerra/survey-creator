import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Login from "./src/screens/login";
import theme from "./src/assets/theme";

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <Login />
        </PaperProvider>
    );
}
