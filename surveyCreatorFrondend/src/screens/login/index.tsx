import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    TouchableOpacity,
} from "react-native";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        // Aqui você colocaria a lógica para verificar as credenciais de login
        console.log("Input do login", email, password);
    };

    const handleForgotPassword = () => {
        // Aqui você pode navegar para outra tela ou abrir um modal para redefinição de senha
        console.log("Forgot Password pressed");
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                secureTextEntry
            />
            <Button title="Fazer Login" onPress={handleLogin} />
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 80,
        width: "100%",
    },
    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "gray",
    },
    forgotPasswordText: {
        marginTop: 15,
        color: "blue",
        textAlign: "center",
    },
});

export default Login;
