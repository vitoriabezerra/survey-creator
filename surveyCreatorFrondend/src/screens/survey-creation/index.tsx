import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Switch, Text, Divider } from "react-native-paper";

// Definição das interfaces
interface ISurveyQuestion {
    title: string;
    isMandatory: boolean;
    options: string[];
    currentAnswer: string | null;
}

interface ISurvey {
    title: string;
    status: "activated" | "deactivated";
    description: string;
    questions: ISurveyQuestion[];
}

// Componente para adicionar perguntas
const QuestionInput = ({ onAddQuestion }) => {
    const [questionTitle, setQuestionTitle] = useState<string>("");
    const [options, setOptions] = useState<string>("");
    const [isMandatory, setisMandatory] = useState<boolean>(true);

    const handleAddQuestion = () => {
        const optionsArray = options.split(";").map((option) => option.trim()); // Transforma string em array
        onAddQuestion({
            title: questionTitle,
            isMandatory: isMandatory,
            options: optionsArray,
            answer: null,
        });
        setQuestionTitle("");
        setOptions("");
    };

    return (
        <View>
            <Text style={styles.surveyText}>Criar pergunta</Text>
            <TextInput
                style={styles.input}
                placeholder="Título da pergunta"
                value={questionTitle}
                onChangeText={setQuestionTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Opções separadas por ponto e vírgula"
                value={options}
                onChangeText={setOptions}
            />
            <View
                style={{
                    justifyContent: "flex-start",
                }}
            >
                <Text>Essa pergunta é obrigatória?</Text>
                <Switch
                    value={isMandatory}
                    onValueChange={(value) => {
                        setisMandatory(value);
                    }}
                    style={{
                        alignContent: "flex-start",
                    }}
                />
            </View>
            <View>
                <Button
                    style={styles.input}
                    mode="outlined"
                    onPress={handleAddQuestion}
                    disabled={questionTitle === "" || options === ""}
                >
                    Adicionar pergunta
                </Button>
                {/* <Divider /> */}
            </View>
        </View>
    );
};

const SurveyQuestionsPreview = ({ questions, onRemoveQuestion }) => {
    return (
        <View>
            {questions.map((question, index) => (
                <View
                    key={index}
                    style={{
                        flexDirection: "row",
                        marginBottom: 20,
                        alignItems: "center",
                    }}
                >
                    <View style={{ flex: 1, paddingRight: 20 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            {question.title}
                            {question.isMandatory ? "*" : ""}
                        </Text>
                        {question.options.map((option, optionIndex) => (
                            <Text key={optionIndex} style={{ marginLeft: 10 }}>
                                • {option}
                            </Text>
                        ))}
                    </View>
                    {/* Botão para remover a pergunta */}
                    <Button
                        icon="trash-can-outline"
                        onPress={() => onRemoveQuestion(index)}
                        children={""}
                    />
                </View>
            ))}
        </View>
    );
};

// Componente principal para criar a pesquisa
const CreateSurveyScreen = () => {
    const [survey, setSurvey] = useState<ISurvey>({
        title: "",
        status: "deactivated",
        description: "",
        questions: [],
    });
    const [isActivated, setIsActivated] = useState(false);

    const handleAddQuestion = (question: ISurveyQuestion) => {
        setSurvey({ ...survey, questions: [...survey.questions, question] });
    };

    const handleRemoveQuestion = (questionIndex) => {
        // Atualiza o estado para remover a pergunta com base no índice
        setSurvey((currentSurvey) => ({
            ...currentSurvey,
            questions: currentSurvey.questions.filter(
                (_, index) => index !== questionIndex
            ),
        }));
    };

    // Aqui você implementaria a lógica para salvar a pesquisa, por exemplo, enviando para uma API

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.surveyText}>Criar Pesquisa</Text>
            <TextInput
                style={styles.input}
                placeholder="Título da pesquisa"
                onChangeText={(text) => setSurvey({ ...survey, title: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                onChangeText={(text) =>
                    setSurvey({ ...survey, description: text })
                }
            />
            <View style={styles.input}>
                <Text>Você deseja ativar essa pesquisa?</Text>
                <Switch
                    value={isActivated}
                    onValueChange={(value) => {
                        setIsActivated(value);
                        setSurvey({
                            ...survey,
                            status: value ? "activated" : "deactivated",
                        });
                    }}
                />
            </View>
            <Divider style={styles.input} />
            <QuestionInput onAddQuestion={handleAddQuestion} />

            {survey.questions.length > 0 && (
                <View>
                    <Divider style={{ marginBottom: 10 }} />
                    <SurveyQuestionsPreview
                        questions={survey.questions}
                        onRemoveQuestion={handleRemoveQuestion}
                    />
                </View>
            )}
            <Button
                style={styles.button}
                mode="contained"
                onPress={() => console.log(survey)}
                disabled={survey.questions.length === 0 || survey.title === ""}
            >
                Salvar pesquisa
            </Button>
            <TouchableOpacity>
                <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            {/* Renderizar as perguntas adicionadas para feedback visual ao usuário (opcional) */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        paddingBottom: 0,
        width: "100%",
    },
    surveyText: {
        fontSize: 22,
        fontWeight: "700",
        color: "rgba(33, 0, 93, 1)",
        marginBottom: 20,
    },
    input: {
        marginBottom: 20,
    },
    cancelText: {
        textAlign: "center",
        color: "rgba(56, 30, 114, 1)",
        marginBottom: 20,
    },
    button: {
        marginBottom: 10,
    },
});

export default CreateSurveyScreen;
