import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const SigninSignUpLayout = ({ children }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("./imagemchat.png")}
                style={styles.imageBackground}
            >
                <View style={styles.overlay}>
                    {/* Caixa branca com sombra */}
                    <View style={styles.whiteBox}>{children}</View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        width: "100%", // Certifique-se de que a largura cobre a tela
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    whiteBox: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Somente necessário para Android
        // Ajuste as dimensões conforme necessário
        width: "80%", // Ou uma medida específica
        // Altura opcional, depende do conteúdo
    },
    boxContent: {
        fontSize: 16,
        color: "black",
    },
});

export default SigninSignUpLayout;
