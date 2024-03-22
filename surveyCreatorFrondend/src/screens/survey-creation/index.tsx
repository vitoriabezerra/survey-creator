import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Modal } from "react-native";
import { TextInput, Button, Switch, Text, Divider } from "react-native-paper";
import {
    ISurvey,
    ISurveyCreation,
    ISurveyQuestion,
} from "../../models/surveyModel";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

// Componente para adicionar perguntas
const QuestionInputModal = ({ visible, onAddQuestion, onClose }) => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [options, setOptions] = useState("");
    const [isMandatory, setIsMandatory] = useState(true);

    const handleAddAndClose = () => {
        if (questionTitle && options) {
            onAddQuestion({
                title: questionTitle,
                isMandatory,
                options: options.split(";").map((option) => option.trim()),
                currentAnswer: null,
            });
            // Limpa os campos após adicionar
            setQuestionTitle("");
            setOptions("");
            setIsMandatory(true);
            onClose(); // Fecha o modal
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onClose}
            animationType="slide"
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                    <TextInput
                        label="Título da pergunta"
                        value={questionTitle}
                        onChangeText={setQuestionTitle}
                        style={styles.input}
                    />
                    <TextInput
                        label="Opções separadas por ponto e vírgula"
                        value={options}
                        onChangeText={setOptions}
                        style={styles.input}
                    />
                    {/* Switch e botão Adicionar Pergunta */}
                    <Button onPress={handleAddAndClose}>
                        Adicionar Pergunta
                    </Button>
                    <Button onPress={onClose}>Cancelar</Button>
                </View>
            </View>
        </Modal>
    );
};

const SurveyQuestionsPreview = ({ questions, onRemoveQuestion }) => {
    return (
        <View style={styles.containerPreview}>
            {questions.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                    <View style={styles.questionTextContainer}>
                        <Text style={styles.questionTitle}>
                            {question.title}
                            {question.isMandatory ? "*" : ""}
                        </Text>
                        {question.options.map((option, optionIndex) => (
                            <Text key={optionIndex} style={styles.option}>
                                • {option}
                            </Text>
                        ))}
                    </View>
                    <Button
                        icon="trash-can-outline"
                        onPress={() => onRemoveQuestion(index)}
                        style={styles.removeButton}
                        children={""}
                    />
                </View>
            ))}
        </View>
    );
};

// Componente principal para criar a pesquisa
const CreateEditSurveyScreen = ({ route, navigation }) => {
    const [survey, setSurvey] = useState<ISurvey>({
        title: "",
        isActivated: true,
        description: "",
        questions: [],
    });
    const [isActivated, setIsActivated] = useState<boolean>(false);
    const [isEdition, setIsEdition] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Se existir uma pequisa já criada, ele irá para tela de edição
    useEffect(() => {
        if (route.params?.survey) {
            setSurvey(route.params.survey);
            setIsEdition(true);
        }
    }, [route.params?.survey]);

    const handleAddQuestion = (question: ISurveyQuestion) => {
        setSurvey({ ...survey, questions: [...survey.questions, question] });
    };

    const handleRemoveQuestion = (questionIndex: number) => {
        // Atualiza o estado para remover a pergunta com base no índice
        setSurvey((currentSurvey) => ({
            ...currentSurvey,
            questions: currentSurvey.questions.filter(
                (_, index) => index !== questionIndex
            ),
        }));
    };

    const handleCreateSurvey = () => {
        const newSurvey: ISurveyCreation = {
            surveyId: uuidv4(),
            createdBy: "user123",
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            survey: survey,
        };
    };

    // Aqui você implementaria a lógica para salvar a pesquisa, por exemplo, enviando para uma API

    return (
        <View style={styles.outerContainer}>
            <ScrollView style={styles.container}>
                <View style={{ padding: 40, paddingTop: 20 }}>
                    <Text style={styles.surveyText}>
                        {isEdition ? "Editar" : "Criar"} pesquisa
                    </Text>
                    <TextInput
                        mode="flat"
                        style={styles.input}
                        label="Título da pesquisa"
                        value={survey.title}
                        onChangeText={(text) =>
                            setSurvey({ ...survey, title: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        mode="flat"
                        label="Descrição"
                        onChangeText={(text) =>
                            setSurvey({ ...survey, description: text })
                        }
                        value={survey.description}
                    />
                    <View style={styles.input}>
                        <Text>Você deseja ativar essa pesquisa?</Text>
                        <Switch
                            value={survey.isActivated}
                            onValueChange={(value) => {
                                setIsActivated(value);
                                setSurvey({
                                    ...survey,
                                    isActivated: value,
                                });
                            }}
                        />
                    </View>
                    <Button icon="plus" onPress={() => setIsModalVisible(true)}>
                        Adicionar Pergunta
                    </Button>
                    <QuestionInputModal
                        visible={isModalVisible}
                        onAddQuestion={handleAddQuestion}
                        onClose={() => setIsModalVisible(false)}
                    />

                    {survey.questions.length > 0 && (
                        <View>
                            <Divider style={{ marginBottom: 10 }} />
                            <SurveyQuestionsPreview
                                questions={survey.questions}
                                onRemoveQuestion={handleRemoveQuestion}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Button
                    mode="contained"
                    onPress={handleCreateSurvey}
                    disabled={
                        survey.questions.length === 0 || survey.title === ""
                    }
                >
                    Salvar pesquisa
                </Button>
                <Button
                    style={styles.button}
                    mode="text"
                    onPress={() => navigation.goBack()}
                >
                    Cancelar
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: 0,
        width: "100%",
        minHeight: screenHeight - 300,
    },
    surveyText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#af69cd",
        marginBottom: 10,
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
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 100,
        width: "80%",
        alignSelf: "center",
    },
    input: {
        width: "100%",
        marginBottom: 10,
        backgroundColor: "transparent", // Remove o fundo padrão para inputs do react-native-paper
    },
    containerPreview: {
        paddingTop: 10,
    },
    questionContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Um fundo leve para cada pergunta
        borderRadius: 8,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    questionTextContainer: {
        flex: 1,
    },
    questionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    option: {
        marginLeft: 10,
        fontSize: 14,
    },
    removeButton: {
        marginLeft: "auto",
    },
    footer: {
        padding: 40, // Espaçamento interno para o footer
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default CreateEditSurveyScreen;
