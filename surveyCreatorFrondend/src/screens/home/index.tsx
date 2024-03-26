import React from "react";
import { View, StyleSheet } from "react-native";

import { Button, Icon, Text } from "react-native-paper";

import SigninSignUpLayout from "../../assets/layout/signin-signup";

const Home = ({ navigation }) => {
    // Ir para página de cadastro de usuário
    const handleSignUp = () => {
        console.log("Vai para a tela de cadastro");
    };

    return (
        <SigninSignUpLayout>
            <View style={styles.container}>
                <Icon source="file-chart-outline" size={80} color="#003b46" />
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} mode="contained">Fazer Login</Button>
                    <Button mode="contained">Continuar sem login</Button>
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
        minHeight: 200,
        justifyContent: "space-around",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
    },
    button: {
        marginRight: 10
    },
    signUpText: {
        color: "#61a4ad",
        fontWeight: "bold",
    },
});

export default Home;
