// Dashboard.js
import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { ISurvey, ISurveyCreation } from "../../models/surveyModel";
import moment from "moment";

const Dashboard = ({ navigation, email }) => {
    // Lista de pesquisas criadas
    const surveys: ISurveyCreation[] = [
        {
            surveyId: "survey1",
            createdAt: "2023-03-20T12:00:00Z",
            createdBy: "user123",
            survey: {
                title: "Feedback do Curso de React Native",
                isActivated: false,
                description:
                    "Nos conte o que você achou do curso de React Native.",
                questions: [
                    {
                        title: "Como você avalia o conteúdo do curso?",
                        options: ["Excelente", "Bom", "Regular", "Ruim"],
                        currentAnswer: null,
                        isMandatory: true,
                    },
                    {
                        title: "O curso atendeu suas expectativas?",
                        options: ["Sim", "Não"],
                        currentAnswer: null,
                        isMandatory: true,
                    },
                ],
            },
        },
        {
            surveyId: "survey2",
            createdAt: "2023-03-21T15:30:00Z",
            createdBy: "admin456",
            survey: {
                title: "Pesquisa de Satisfação de Cliente",
                isActivated: true,
                description:
                    "Ajude-nos a melhorar nossos serviços respondendo esta rápida pesquisa.",
                questions: [
                    {
                        title: "Você recomendaria nossos serviços a amigos ou familiares?",
                        options: [
                            "Definitivamente sim",
                            "Provavelmente sim",
                            "Provavelmente não",
                            "Definitivamente não",
                        ],
                        currentAnswer: null,
                        isMandatory: true,
                    },
                    {
                        title: "Como você avalia nosso atendimento ao cliente?",
                        options: ["Excelente", "Bom", "Regular", "Ruim"],
                        currentAnswer: null,
                        isMandatory: true,
                    },
                ],
            },
        },
        {
            surveyId: "survey3",
            createdAt: "2023-03-21T15:30:00Z",
            createdBy: "admin456",
            survey: {
                title: "Pesquisa de Satisfação de Cliente, testando titulo muito grande",
                isActivated: false,
                description:
                    "Ajude-nos a melhorar nossos serviços respondendo esta rápida pesquisa.",
                questions: [
                    {
                        title: "Você recomendaria nossos serviços a amigos ou familiares?",
                        options: [
                            "Definitivamente sim",
                            "Provavelmente sim",
                            "Provavelmente não",
                            "Definitivamente não",
                        ],
                        currentAnswer: null,
                        isMandatory: true,
                    },
                    {
                        title: "Como você avalia nosso atendimento ao cliente?",
                        options: ["Excelente", "Bom", "Regular", "Ruim"],
                        currentAnswer: null,
                        isMandatory: true,
                    },
                ],
            },
        },
    ];

    const goToSurveyEditCreate = (survey: ISurveyCreation | null = null) => {
        navigation.navigate("SurveyEditCreate", {
            survey: survey ? survey.survey : null,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.surveyText}>Pesquisas</Text>
            <FlatList
                data={surveys}
                keyExtractor={(item) => item.surveyId}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.surveyItem}
                        onPress={() => goToSurveyEditCreate(item)}
                    >
                        <View style={styles.surveyTextContainer}>
                            <Text style={styles.surveyTitle} numberOfLines={1}>
                                {item.survey.title}
                            </Text>
                            <Text style={styles.surveyDateText}>
                                {moment(item.createdAt).format("DD/MM/YYYY")}
                            </Text>
                        </View>
                        <Button icon="square-edit-outline" children={""} />
                    </TouchableOpacity>
                )}
            />
            <Button
                style={styles.addButton}
                icon="plus"
                mode="contained"
                onPress={() => goToSurveyEditCreate()}
            >
                Criar nova pesquisa
            </Button>
        </View>
    );
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

export default Dashboard;
