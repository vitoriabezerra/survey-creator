import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_SURVEY_ANSWERS } from "../../graphql/queries/queries";

const SurveyDataScreen = ({ route }) => {
    const { surveyId, survey } = route.params;
    const { loading, error, data } = useQuery(GET_SURVEY_ANSWERS, {
        variables: { surveyId },
    });

    if (loading) return <Text>Carregando...</Text>;
    if (error) return <Text>Erro: {error.message}</Text>;

    // Inicializa processedData com todas as respostas possíveis, definindo a contagem inicial como 0
    let processedData = {};
    survey.questions.forEach((question) => {
        processedData[question.id] = {};
        question.options.forEach((option) => {
            processedData[question.id][option] = 0; // Define todas as opções com contagem 0 inicialmente
        });
    });

    // Atualiza a contagem com base nas respostas recebidas
    if (data && data.surveyAnswers && data.surveyAnswers.length > 0) {
        data.surveyAnswers.forEach((answer) => {
            answer.answers.forEach((item) => {
                if (processedData[item.questionId]) {
                    if (
                        processedData[item.questionId][item.answer] !==
                        undefined
                    ) {
                        processedData[item.questionId][item.answer] += 1;
                    } else {
                        console.warn(
                            `Resposta '${item.answer}' não encontrada nas opções da pergunta ID: ${item.questionId}`
                        );
                    }
                }
            });
        });
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.surveyTitle}>{survey.title}</Text>
            <Text style={styles.surveyTitle}>
                Total de respostas: {data.surveyAnswers.length}
            </Text>
            {survey.questions.map((question) => (
                <View key={question.id} style={styles.questionBlock}>
                    <Text style={styles.questionText}>{question.title}</Text>
                    {Object.entries(processedData[question.id]).map(
                        ([answer, count]) => (
                            <Text
                                key={answer}
                                style={styles.answerText}
                            >{`${answer}: ${count.toString()}`}</Text>
                        )
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 20,
    },
    surveyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        alignSelf: "center",
    },
    questionBlock: {
        marginBottom: 20,
        alignItems: "flex-start",
    },
    questionText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    answerText: {
        fontSize: 14,
    },
});

export default SurveyDataScreen;
