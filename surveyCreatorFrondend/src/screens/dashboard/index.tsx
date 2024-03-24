// Dashboard.js
import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import moment from "moment";
import { IUser } from "../../models/userModel";
import { GET_SURVEYS_QUERY } from "../../graphql/queries/queries";
import { useQuery } from "@apollo/client";
import { ISurvey } from "../../models/surveyModel";

const Dashboard = ({ route, navigation }) => {
    const { user } = route.params;

    const [surveys, setSurveys] = useState<ISurvey[]>([]);

    const loggedUser: IUser = user;
    const { loading, error, data } = useQuery(GET_SURVEYS_QUERY, {
        variables: {
            isActivated: loggedUser.typeOfUser === "user" ? true : undefined,
        },
    });

    useEffect(() => {
        // Quando os dados forem recebidos e não estiverem mais carregando, atualize o estado de surveys
        if (!loading && data) {
            setSurveys(data.surveys);
        }
    }, [loading, data]); // Depende de loading e data para reagir a mudanças

    if (loading) return <Text>...</Text>;

    const goToSurveyEditCreate = (survey = null) => {
        navigation.navigate("SurveyEditCreate", {
            survey: survey ? survey : null,
            user,
        });
    };

    const goToSurveyResponse = (survey: ISurvey) => {
        navigation.navigate("AnswerSurvey", { survey, user });
    };

    return (
        <View style={styles.container}>
            <View style={{ padding: 30, paddingTop: 20 }}>
                <Text style={styles.surveyText}>Pesquisas</Text>
                <FlatList
                    data={surveys}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const isAnswered =
                            loggedUser.typeOfUser === "user" &&
                            loggedUser.surveys.answered.includes(item.id);
                        return (
                            <TouchableOpacity
                                style={[
                                    styles.surveyItem,
                                    isAnswered ? styles.surveyItemDisabled : {},
                                ]}
                                onPress={() => {
                                    if (loggedUser.typeOfUser === "admin") {
                                        goToSurveyEditCreate(item);
                                    } else if (!isAnswered) {
                                        goToSurveyResponse(item);
                                    } else {
                                        // Opcionalmente, maneje o caso de tentar responder uma pesquisa já respondida
                                    }
                                }}
                                disabled={isAnswered} // Desabilita a interatividade se já foi respondida
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center", // Alinha os itens verticalmente
                                        width: "100%",
                                    }}
                                >
                                    <View style={{ flex: 1, paddingRight: 10 }}>
                                        <Text
                                            style={styles.surveyTitle}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.title}
                                        </Text>
                                        <Text style={styles.surveyDateText}>
                                            {loggedUser.typeOfUser === "admin"
                                                ? moment(item.createdAt).format(
                                                      "DD/MM/YYYY"
                                                  )
                                                : item.description}
                                        </Text>
                                        {isAnswered && (
                                            <View style={{ marginTop: 10 }}>
                                                <Text>✓ Respondido</Text>
                                            </View>
                                        )}
                                    </View>
                                    {loggedUser.typeOfUser === "admin" && (
                                        <Button
                                            icon="square-edit-outline"
                                            onPress={() =>
                                                goToSurveyEditCreate(item)
                                            }
                                            children={""}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                {loggedUser.typeOfUser === "admin" && (
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
    surveyItemDisabled: {
        opacity: 0.5, // Torna o card mais "pálido"
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
