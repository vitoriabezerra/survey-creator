import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const SigninSignUpLayout = ({ children }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../imagemchat.png")}
                style={styles.imageBackground}
            >
                {/* Camada de Transparência */}
                <View style={styles.transparencyLayer}></View>

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
        elevation: 5,
        width: "80%",
    },
    boxContent: {
        fontSize: 16,
        color: "black",
    },
    transparencyLayer: {
        ...StyleSheet.absoluteFillObject, // Isso faz com que a camada de transparência cubra toda a área da imagem
        // backgroundColor: "rgba(255, 255, 255, 0.5)", // Ajuste a opacidade aqui
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Isso adiciona uma camada cinza com 50% de opacidade
    },
});

export default SigninSignUpLayout;
