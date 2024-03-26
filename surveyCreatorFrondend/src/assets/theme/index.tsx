import { DefaultTheme } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    custom: {
        backgroundColor: "#4b0081",
    },
    colors: {
        ...DefaultTheme.colors,
        primary: "#61a4ad",
        accent: "#03dac4",
        text: "#000000",
        backgroundColor: "#4b0081",
        // Adicione outras cores que você deseja customizar
    },
    // Aqui você pode customizar as fontes
    fonts: {
        ...DefaultTheme.fonts,
        regular: {
            fontFamily: "Roboto-Regular",
            fontWeight: "normal",
        },
        medium: {
            fontFamily: "Roboto-Medium",
            fontWeight: "normal",
        },
        // Adicione outras customizações de fonte conforme necessário
    },
    components: {
        ...DefaultTheme,
        Button: {
            style: {
                color: "#4b0081",
                background: "#e6ccef",
            },
        },
    },
    // Adicione outras customizações do tema aqui
};

export default theme;
