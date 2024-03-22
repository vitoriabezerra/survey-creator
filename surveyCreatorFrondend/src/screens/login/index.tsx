import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

import { Button, TextInput, Text } from "react-native-paper";
import Layout from "../../assets/Layout";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    let user: "user" | "admin" = "user";

    // Sign in the user
    const handleLogin = () => {
        console.log("Input do login", email, password);

        // TO DO - Logica do login
        // Esta é uma simplificação para fins de exemplo
        let userRole: "user" | "admin";

        if (email === "admin" && password === "admin") {
            userRole = "admin";
        } else {
            userRole = "user";
        }

        navigation.navigate("Dashboard", { email, user: userRole });
    };

    // Redirect to the reset password page
    const handleForgotPassword = () => {
        console.log("Forgot Password pressed");
    };

    return (
        <Layout>
            <View style={styles.container}>
                <ImageBackground
                    source={require("./image32.png")}
                    style={{
                        width: 150,
                        height: 150,
                        alignSelf: "center",
                        marginBottom: 0,
                    }}
                ></ImageBackground>

                <View style={styles.texts}>
                    <Text style={styles.surveyText}>Survey</Text>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Text style={styles.creatorText}>creator</Text>
                        <Text
                            style={{
                                fontSize: 30,
                                lineHeight: 130,
                                color: "rgba(33, 0, 93, 1)",
                            }}
                        >
                            ®
                        </Text>
                    </View>
                </View>

                <TextInput
                    mode="flat"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    mode="flat"
                    value={password}
                    onChangeText={setPassword}
                    label="Senha"
                    secureTextEntry = {hidePassword}
                    right={<TextInput.Icon icon="eye" />}
                    style={styles.input}
                />
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={handleLogin}>
                        Fazer login
                    </Button>
                    <Button mode="text" onPress={handleForgotPassword}>
                        Esqueci a senha
                    </Button>
                </View>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
        width: "100%",
    },
    texts: {
        alignItems: "center",
        textAlign: "center",
        marginBottom: 20,
    },
    surveyText: {
        fontSize: 90,
        fontWeight: "900",
        color: "rgba(33, 0, 93, 1)",
        lineHeight: 100,
        marginBottom: -50,
    },
    creatorText: {
        fontSize: 70,
        fontWeight: "900",
        color: "rgba(33, 0, 93, 1)",
        lineHeight: 130,
    },
    input: {
        marginBottom: 10,
        backgroundColor: "transparent",
    },
    buttonContainer: {
        padding: 30,
    },
});

export default Login;
