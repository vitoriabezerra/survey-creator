import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

import { Button, TextInput, Text } from "react-native-paper";
import Layout from "../../assets/Layout";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations/mutations";
import { IUser } from "../../models/userModel";

interface LoginResponse {
    login: IUser;
}

const Login = ({ navigation }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>("");

    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
    // Sign in the user
    const handleLogin = async () => {
        try {
            const { data } = await login({
                variables: { email, password },
            });
            console.log("Login bem-sucedido", data);
            navigation.navigate("Dashboard", { user: data.login });
            // Limpa os erros e campos se o login for bem-sucedido
            setEmailError(false);
            setPasswordError(false);
            setEmail("");
            setPassword("");
        } catch (err) {
            setLoginError("Usuário ou senha incorretos.");
            setEmailError(true);
            setPasswordError(true);
        }
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
                                color: "#af69cd",
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
                    onChangeText={(text) => {
                        setEmail(text);
                        {
                            if (emailError) {
                                setEmailError(false);
                                setPasswordError(false);
                                setLoginError("");
                            }
                        }
                    }}
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={emailError}
                />
                <TextInput
                    mode="flat"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        if (passwordError) {
                            setPasswordError(false);
                            setEmailError(false);
                            setLoginError("");
                        }
                    }}
                    label="Senha"
                    secureTextEntry={hidePassword}
                    right={
                        <TextInput.Icon
                            icon={hidePassword ? "eye" : "eye-off"} // Alterna o ícone com base na visibilidade
                            onPress={() => setHidePassword(!hidePassword)}
                        />
                    }
                    style={styles.input}
                    error={passwordError}
                />
                {loginError ? (
                    <Text style={{ color: "red" }}>{loginError}</Text>
                ) : null}
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
        color: "#af69cd",
        lineHeight: 100,
        marginBottom: -50,
    },
    creatorText: {
        fontSize: 70,
        fontWeight: "900",
        color: "#af69cd",
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
