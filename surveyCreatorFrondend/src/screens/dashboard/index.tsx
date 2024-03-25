// Dashboard.js
import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Modal,
    Dimensions,
} from "react-native";
import { Button, Text } from "react-native-paper";
import moment from "moment";
import { IUser } from "../../models/userModel";
import { GET_SURVEYS_QUERY } from "../../graphql/queries/queries";
import { useQuery } from "@apollo/client";
import { ISurvey } from "../../models/surveyModel";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Dashboard = ({ route, navigation }) => {
    const { user } = route.params;

    const [surveys, setSurveys] = useState<ISurvey[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState<ISurvey>(null);

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

    const handleSurveyClick = (item: ISurvey) => {
        setSelectedSurvey(item);
        setIsModalVisible(true);
    };

    const goToSurveyData = (surveyId: string) => {
        navigation.navigate("SurveyData", { surveyId });
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
                                        handleSurveyClick(item);
                                    } else if (!isAnswered) {
                                        goToSurveyResponse(item);
                                    } else {
                                        Alert.alert(
                                            "Informação",
                                            "Você já respondeu a esta pesquisa."
                                        );
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Button
                                    mode="contained"
                                    style={styles.button}
                                    onPress={() => {
                                        goToSurveyEditCreate(selectedSurvey);
                                        setIsModalVisible(false);
                                    }}
                                >
                                    Editar Pesquisa
                                </Button>
                                <Button
                                    mode="contained"
                                    style={styles.button}
                                    onPress={() => {
                                        goToSurveyData(selectedSurvey.id);
                                        setIsModalVisible(false);
                                    }}
                                >
                                    Ver Respostas
                                </Button>
                                <Button
                                    mode="text"
                                    onPress={() => setIsModalVisible(false)}
                                >
                                    Fechar
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        marginBottom: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
        justifyContent: "center",
        alignItems: "center",
        width: screenWidth,
        height: screenHeight,
    },
});

export default Dashboard;
