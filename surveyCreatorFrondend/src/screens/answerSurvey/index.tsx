import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { RadioButton, Button } from "react-native-paper";

const AnswerSurveyScreen = ({ route }) => {
    const { survey } = route.params;
    const [responses, setResponses] = useState({});

    const handleResponseChange = (questionTitle, value) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [questionTitle]: value,
        }));
    };

    const submitResponses = () => {
        // Verifica se todas as perguntas obrigatórias foram respondidas
        const allMandatoryQuestionsAnswered = survey.questions.every(question => {
          return !question.isMandatory || (question.isMandatory && responses[question.title]);
        });
      
        if (!allMandatoryQuestionsAnswered) {
          Alert.alert(
            "Perguntas obrigatórias não respondidas",
            "Por favor, responda a todas as perguntas obrigatórias antes de enviar.",
            [{ text: "OK" }]
          );
          return;
        }
      
        // Se todas as perguntas obrigatórias foram respondidas, prossiga com o envio
        console.log("Respostas enviadas:", responses);
        // Aqui você adicionaria a lógica para enviar as respostas para o backend ou outro tratamento necessário
      };

    return (
        <View style={{ flex: 1, padding: 30 }}>
            <ScrollView style={styles.container}>
                {/* Título e descrição da pesquisa */}
                <Text style={styles.title}>{survey.title}</Text>
                <Text style={styles.description}>{survey.description}</Text>
                {survey.questions.map((question, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>
                            {question.title}
                            {question.isMandatory && (
                                <Text style={styles.mandatoryIndicator}>*</Text>
                            )}
                        </Text>
                        <RadioButton.Group
                            onValueChange={(value) =>
                                handleResponseChange(question.title, value)
                            }
                            value={responses[question.title] || ""}
                        >
                            {question.options.map((option, optionIndex) => (
                                <View
                                    key={optionIndex}
                                    style={styles.optionContainer}
                                >
                                    <RadioButton value={option} />
                                    <Text>{option}</Text>
                                </View>
                            ))}
                        </RadioButton.Group>
                    </View>
                ))}
            </ScrollView>
            <Button mode="contained" onPress={submitResponses}>
                Enviar respostas
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    questionContainer: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5, // Espaçamento entre as opções
    },
    questionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    mandatoryIndicator: {
        color: "red", // Isso destacará o asterisco em vermelho
        fontSize: 20, // Opcional: Ajuste o tamanho conforme necessário
    },
    // Outros estilos necessários...
});

export default AnswerSurveyScreen;
