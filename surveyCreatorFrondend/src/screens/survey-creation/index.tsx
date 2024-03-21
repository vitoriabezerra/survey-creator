import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Switch,
    Text,
    ScrollView,
} from "react-native";

// Definição das interfaces
interface ISurveyQuestion {
    title: string;
    options: string[];
    answer: string;
}

interface ISurvey {
    title: string;
    status: "activated" | "deactivated";
    description: string;
    questions: ISurveyQuestion[];
}

// Componente para adicionar perguntas
const QuestionInput = ({ onAddQuestion }) => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [options, setOptions] = useState("");

    const handleAddQuestion = () => {
        const optionsArray = options.split(",").map((option) => option.trim()); // Transforma string em array
        onAddQuestion({
            title: questionTitle,
            options: optionsArray,
            answer: "",
        });
        setQuestionTitle("");
        setOptions("");
    };

    return (
        <View>
            <TextInput
                placeholder="Título da Pergunta"
                value={questionTitle}
                onChangeText={setQuestionTitle}
            />
            <TextInput
                placeholder="Opções separadas por vírgula"
                value={options}
                onChangeText={setOptions}
            />
            <Button title="Adicionar Pergunta" onPress={handleAddQuestion} />
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

    // Aqui você implementaria a lógica para salvar a pesquisa, por exemplo, enviando para uma API

    return (
        <ScrollView>
            <TextInput
                placeholder="Título da Pesquisa"
                onChangeText={(text) => setSurvey({ ...survey, title: text })}
            />
            <TextInput
                placeholder="Descrição"
                onChangeText={(text) =>
                    setSurvey({ ...survey, description: text })
                }
            />
            <View>
                <Text>Status:</Text>
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
            <QuestionInput onAddQuestion={handleAddQuestion} />
            <Button
                title="Salvar Pesquisa"
                onPress={() => console.log(survey)}
            />
            {/* Renderizar as perguntas adicionadas para feedback visual ao usuário (opcional) */}
        </ScrollView>
    );
};

export default CreateSurveyScreen;
