import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { RadioButton, Button } from "react-native-paper";
import { ISurveyAnswer } from "../../models/surveyAnswersModel";
import { ANSWER_SURVEY_MUTATION } from "../../graphql/mutations/mutations";
import { useMutation } from "@apollo/client";

const AnswerSurveyScreen = ({ route, navigation }) => {
    const { survey, user, onGoBack} = route.params;
    const [response, setResponse] = useState<ISurveyAnswer>({
        surveyId: survey.id,
        userId: user.id,
        answers: [],
    });

    const [answerSurvey, { data, loading, error }] = useMutation(
        ANSWER_SURVEY_MUTATION
    );

    const handleResponseChange = (questionId, selectedOption) => {
        // Atualiza o estado para incluir a nova resposta,
        // garantindo que estamos usando questionId em vez do título da pergunta
        setResponse((prevResponses) => {
            const newAnswers = [...prevResponses.answers];
            const answerIndex = newAnswers.findIndex(
                (answer) => answer.questionId === questionId
            );

            if (answerIndex >= 0) {
                // Atualiza a resposta existente
                newAnswers[answerIndex] = {
                    ...newAnswers[answerIndex],
                    selectedOption,
                };
            } else {
                // Adiciona uma nova resposta se não existir uma para a pergunta
                newAnswers.push({ questionId, selectedOption });
            }

            return { ...prevResponses, answers: newAnswers };
        });
    };

    const submitResponses = async () => {
        // Verifica se todas as perguntas obrigatórias foram respondidas
        const allMandatoryQuestionsAnswered = survey.questions.every(
            (question) => {
                if (!question.isMandatory) return true; // Se não for obrigatória, considera como respondida

                // Verifica se existe alguma resposta para a pergunta obrigatória
                return response.answers.some(
                    (answer) =>
                        answer.questionId === question.id &&
                        answer.selectedOption !== undefined
                );
            }
        );

        if (!allMandatoryQuestionsAnswered) {
            Alert.alert(
                "Perguntas obrigatórias não respondidas",
                "Por favor, responda a todas as perguntas obrigatórias antes de enviar.",
                [{ text: "CONTINUAR" }]
            );
            return;
        }

        try {
            await answerSurvey({
                variables: {
                    input: {
                        surveyId: response.surveyId,
                        userId: response.userId,
                        answers: response.answers.map((ans) => ({
                            questionId: ans.questionId,
                            answer: ans.selectedOption,
                        })),
                    },
                },
            });
            Alert.alert("Sucesso", "Respostas enviadas com sucesso.", [
                { text: "CONTINUAR" },
            ]);
            onGoBack?.();
            navigation.goBack();
        } catch (error) {
            // Handle errors
            console.error(error);
        }
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
                            onValueChange={(selectedOption) =>
                                handleResponseChange(
                                    question.id,
                                    selectedOption
                                )
                            }
                            value={
                                response.answers.find(
                                    (answer) =>
                                        answer.questionId === question.id
                                )?.selectedOption || ""
                            }
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
