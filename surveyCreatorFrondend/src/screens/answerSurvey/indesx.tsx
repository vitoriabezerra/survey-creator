// Dashboard.js
import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { ISurvey, ISurveyCreation } from "../../models/surveyModel";
import moment from "moment";

const AnswerSurvey = ({ route, navigation }) => {
    // Lista de pesquisas criadas

    const [survey, setSurvey] = useState<ISurvey>({
        title: "",
        isActivated: true,
        description: "",
        questions: [],
    });
    // Se existir uma pequisa já criada, ele irá para tela de edição
    useEffect(() => {
        if (route.params?.survey) {
            setSurvey(route.params.survey);
        }
    }, [route.params?.survey]);

    return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    surveyTextContainer: {
        flex: 1, // Faz com que o container de texto ocupe a maior parte do espaço horizontal...
        marginRight: 10, // ...mas deixa espaço para o botão
    },
    surveyTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5, // Espaço entre o título e a data
    },
    surveyDateText: {
        fontSize: 14, // Menor que o título para diferenciação
        color: "#666", // Cor mais sutil para a data
    },
    surveyText: {
        marginLeft: 20,
        fontSize: 22,
        fontWeight: "700",
        color: "#af69cd",
        marginBottom: 10,
    },
    surveyItem: {
        padding: 20,
        paddingRight: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    surveyDate: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    addButton: {
        margin: 20,
    },
});

export default AnswerSurvey;
