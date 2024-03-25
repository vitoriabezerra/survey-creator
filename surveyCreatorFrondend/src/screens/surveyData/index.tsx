import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_SURVEY_ANSWERS } from "../../graphql/queries/queries";
import { VictoryPie, VictoryTheme } from "victory";

const SurveyDataScreen = ({ route }) => {
    const { surveyId } = route.params;
    const { loading, error, data } = useQuery(GET_SURVEY_ANSWERS, {
        variables: { surveyId },
    });

    let chartData = [];

    if (loading) return <Text>Carregando...</Text>;
    if (error) return <Text>Erro: {error.message}</Text>;

    if (data && data.surveyAnswers && data.surveyAnswers.length > 0) {
        const processedData = data.surveyAnswers.reduce((acc, current) => {
            current.answers.forEach((answer) => {
                const key = `${answer.questionId}-${answer.answer}`;
                if (!acc[key]) {
                    acc[key] = { question: answer.answer, quantity: 1 };
                } else {
                    acc[key].quantity += 1;
                }
            });
            return acc;
        }, {});

        chartData = Object.values(processedData);
    }

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            {chartData.length > 0 ? (
                <VictoryPie
                    data={chartData}
                    x="question"
                    y="quantity"
                    theme={VictoryTheme.material}
                />
            ) : (
                <Text>Nenhuma resposta para esta pesquisa ainda.</Text>
            )}
        </View>
    );
};

export default SurveyDataScreen;
