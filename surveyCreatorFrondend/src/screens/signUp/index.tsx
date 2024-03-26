import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import SigninSignUpLayout from "../../assets/layout/signin-signup";

const SignUpScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        const userObject = {
            name: name,
            email: email,
            password: password,
            typeOfUser: "user",
            surveys: {
                answered: [],
                created: [],
            },
        };
        console.log(userObject);
    };

    return (
        <SigninSignUpLayout>
            <View style={styles.container}>
                <TextInput
                    label="Nome"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                />
                <TextInput
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    label="Confirme a senha"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={handleSubmit}>
                        Criar conta
                    </Button>
                </View>
            </View>
        </SigninSignUpLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
    input: {
        marginBottom: 12,
        backgroundColor: "transparent",
    },
    buttonContainer: {
        padding: 30,
        paddingBottom: 0,
    },
});

export default SignUpScreen;
