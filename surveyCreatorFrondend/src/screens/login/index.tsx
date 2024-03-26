import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

import { Button, TextInput, Text } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations/mutations";
import { IUser } from "../../models/userModel";
import AppLayout from "../../assets/layout/main";
import SigninSignUpLayout from "../../assets/layout/signin-signup";

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
    // Sign In usuario
    const handleLogin = async () => {
        try {
            const { data } = await login({
                variables: { email, password },
            });

            navigation.navigate("Dashboard", { user: data.login });

            // Limpa os erros e campos se o login for bem-sucedido
            setEmailError(false);
            setPasswordError(false);
            setEmail("");
            setPassword("");
        } catch (err) {
            setLoginError("E-mail/senha incorreto.");
            setEmailError(true);
            setPasswordError(true);
        }
    };

    // Ir para página de resetar a senha
    const handleForgotPassword = () => {
        console.log("Forgot Password pressed");
    };

    return (
        <SigninSignUpLayout>
            <View>
                <View style={styles.texts}>
                    {/* <Text style={styles.surveyText}>Entrary</Text> */}
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Text style={styles.signInText}>Bem vindo(a)!</Text>
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
        </SigninSignUpLayout>
    );
};

const styles = StyleSheet.create({
    texts: {
        alignItems: "center",
        textAlign: "center",
    },
    signInText: {
        fontSize: 40,
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
