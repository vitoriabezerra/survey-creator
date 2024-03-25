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
import {
    GET_SURVEYS_QUERY,
    GET_USER_QUERY,
} from "../../graphql/queries/queries";
import { useQuery } from "@apollo/client";
import { ISurvey } from "../../models/surveyModel";
import { useFocusEffect } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Dashboard = ({ route, navigation }) => {
    const { user } = route.params;

    const [surveys, setSurveys] = useState<ISurvey[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState<ISurvey>(null);
    const [loggedUser, setLoggedUser] = useState<IUser>(user);

    const {
        loading: loadingSurveys,
        data: dataSurveys,
        refetch: refetchSurveys,
    } = useQuery(GET_SURVEYS_QUERY, {
        variables: {
            isActivated: user.typeOfUser === "user" ? true : undefined,
        },
    });

    const {
        loading: loadingUser,
        data: dataUser,
        refetch: refetchUser,
    } = useQuery(GET_USER_QUERY, {
        variables: { id: user.id },
    });

    useFocusEffect(
        React.useCallback(() => {
            // Refetch ambas as queries ao ganhar foco
            refetchSurveys();
            refetchUser();
        }, [refetchSurveys, refetchUser])
    );

    // Atualiza o estado local com os dados das pesquisas
    useEffect(() => {
        if (!loadingSurveys && dataSurveys) {
            setSurveys(dataSurveys.surveys);
        }
    }, [loadingSurveys, dataSurveys]);

    // Atualiza o estado local com os dados do usuário
    useEffect(() => {
        if (!loadingUser && dataUser) {
            setLoggedUser(dataUser.user);
        }
    }, [loadingUser, dataUser]);

    // Renderiza loading se qualquer um dos dados estiver carregando
    if (loadingSurveys || loadingUser) return <Text>Carregando...</Text>;

    const goToSurveyEditCreate = (survey = null) => {
        navigation.navigate("SurveyEditCreate", {
            survey: survey ? survey : null,
            user,
            onGoBack: () => {
                refetchSurveys();
                refetchUser();}
        });
    };

    const goToSurveyResponse = (survey: ISurvey) => {
        navigation.navigate("AnswerSurvey", {
            survey,
            user,
            onGoBack: () => {
                refetchSurveys();
                refetchUser();}
        });
    };

    const handleSurveyClick = (item: ISurvey) => {
        setSelectedSurvey(item);
        setIsModalVisible(true);
    };

    const goToSurveyData = (surveyId: string, survey: ISurvey) => {
        navigation.navigate("SurveyData", { surveyId, survey });
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
                                        goToSurveyData(
                                            selectedSurvey.id,
                                            selectedSurvey
                                        );
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
