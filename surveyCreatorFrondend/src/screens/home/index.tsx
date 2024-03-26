import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

import { Button, Icon, Text } from "react-native-paper";

import SigninSignUpLayout from "../../assets/layout/signin-signup";
import AppButton from "../../components/button";

const Home = ({ navigation }) => {
    // Ir para página de cadastro de usuário
    const handleSignUp = () => {
        navigation.navigate("SignUp", {});
    };

    const handleSignIn = () => {
        navigation.navigate("Login", {});
    };

    const handleContinue = () => {
        console.log("Vai para a tela de cadastro");
    };

    return (
        <SigninSignUpLayout>
            <View style={styles.container}>
                <ImageBackground
                    source={require("./surveycreator-logo.png")}
                    style={{ width: 100, height: 100 }}
                ></ImageBackground>
                <View style={styles.buttonContainer}>
                    <AppButton
                        variant="contained"
                        onPress={handleSignIn}
                        style={styles.button}
                    >
                        Entrar
                    </AppButton>

                    <AppButton
                        variant="contained"
                        onPress={handleContinue}
                        style={styles.button}
                    >
                        Continuar sem login
                    </AppButton>
                </View>
                <Text>
                    Ainda não tem conta?
                    <Text style={styles.signUpText} onPress={handleSignUp}>
                        {" "}
                        Registre-se
                    </Text>
                </Text>
            </View>
        </SigninSignUpLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 230,
        justifyContent: "space-around",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "column",
        width: "80%",
    },
    button: {
        marginBottom: 10,
    },
    buttonBox: {
        height: 30,
        marginVertical: 0,
        marginHorizontal: 0,
        padding: 0,
        width: 135,
    },
    labelStyle: {
        fontSize: 12,
        padding: 0,
        margin: 0,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    signUpText: {
        color: "#61a4ad",
        fontWeight: "bold",
    },
    completeFormButton: {
        height: 30,
        padding: 0,
        margin: 0,
    },
    completeFormButtonText: {
        fontSize: 40,
    },
});

export default Home;
