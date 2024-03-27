import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import SigninSignUpLayout from "../../assets/layout/signin-signup";
import { CREATE_USER_MUTATION } from "../../graphql/mutations/mutations";
import { useMutation } from "@apollo/client";
import AppModal from "../../components/modal/modal";
import { IUser, UserType } from "../../models/userModel";
import AppButton from "../../components/button";

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [createUser, { data, loading, error }] =
        useMutation(CREATE_USER_MUTATION);

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const handleSubmit = async () => {
        const userObject: IUser = {
            name: name,
            email: email,
            password: password,
            typeOfUser: UserType.user,
            surveys: {
                answered: [],
                created: [],
            },
        };
        console.log(userObject);

        try {
            const { data } = await createUser({
                variables: { input: userObject },
            });

            setIsSuccessModalVisible(true);

            // Abre uma modal de sucesso, e  com opção de de fazer login ou voltar para pa´gina anterior
        } catch (err) {
            console.error(err);
        }
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
            <AppModal
                visibility={[isSuccessModalVisible, setIsSuccessModalVisible]}
            >
                <Text>Cadastro realizado com sucesso!</Text>
                <AppButton
                    style={styles.button}
                    variant="contained"
                    onPress={() => {
                        setIsSuccessModalVisible(false);
                        navigation.navigate("Login", {});
                    }}
                >
                    Fazer Login
                </AppButton>
                <AppButton
                    style={styles.button}
                    variant="contained"
                    onPress={() => {
                        setIsSuccessModalVisible(false);
                        navigation.navigate("Home", {});
                    }}
                >
                    Voltar
                </AppButton>
            </AppModal>
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
    button: {
        marginTop: 10,
    },
});

export default SignUpScreen;
