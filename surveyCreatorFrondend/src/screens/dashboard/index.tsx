// Dashboard.js
import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { ISurveyCreation } from "../../models/surveyModel";
import moment from "moment";

const Dashboard = ({ route, navigation }) => {
    const { email, user } = route.params;

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

    const goToSurveyEditCreate = (survey = null) => {
        navigation.navigate("SurveyEditCreate", {
            survey: survey ? survey.survey : null,
        });
    };

    const goToSurveyResponse = (surveyId) => {
        navigation.navigate("AnswerSurvey", { surveyId });
    };

    return (
        <View style={styles.container}>
            <View style={{ padding: 30, paddingTop: 20 }}>
                <Text style={styles.surveyText}>Pesquisas</Text>
                <FlatList
                    data={
                        user === "admin"
                            ? surveys
                            : surveys.filter(
                                  (survey) => survey.survey.isActivated
                              )
                    }
                    keyExtractor={(item) => item.surveyId}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.surveyItem}
                            onPress={() =>
                                user === "admin"
                                    ? goToSurveyEditCreate(item)
                                    : goToSurveyResponse(item.surveyId)
                            }
                        >
                            <View style={styles.surveyTextContainer}>
                                <Text
                                    style={styles.surveyTitle}
                                    numberOfLines={1}
                                >
                                    {item.survey.title}
                                </Text>
                                <Text style={styles.surveyDateText}>
                                    {user === "admin"
                                        ? moment(item.createdAt).format(
                                              "DD/MM/YYYY"
                                          )
                                        : item.survey.description}
                                </Text>
                            </View>
                            {user === "admin" && (
                                <Button
                                    icon="square-edit-outline"
                                    children={""}
                                    onPress={() => goToSurveyEditCreate(item)}
                                />
                            )}
                        </TouchableOpacity>
                    )}
                />
                {user === "admin" && (
                    <Button
                        style={styles.addButton}
                        icon="plus"
                        mode="contained"
                        onPress={() => goToSurveyEditCreate(null)}
                    >
                        Criar nova pesquisa
                    </Button>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    surveyText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#af69cd",
        marginBottom: 10,
    },
    surveyItem: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: "#ffffff", // Fundo claro para cada item
        borderRadius: 8,
        padding: 10,
        paddingRight: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        justifyContent: "space-between",
    },
    surveyTextContainer: {
        flex: 1,
    },
    surveyTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    surveyDateText: {
        fontSize: 14,
    },
    addButton: {
        margin: 20,
    },
    // Adicione outros estilos necessários aqui
});

export default Dashboard;
