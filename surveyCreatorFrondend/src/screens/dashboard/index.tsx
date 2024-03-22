// Dashboard.js
import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";

const Dashboard = ({ navigation }) => {
    // Lista de pesquisas criadas
    const surveys = [];

    const goToSurveyEditCreate = (survey = null) => {
        navigation.navigate("SurveyEditCreate", { survey });
    };

    return (
        <View>
            <FlatList
                data={surveys}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => goToSurveyEditCreate(item)}
                    >
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button
                icon="plus"
                onPress={() => goToSurveyEditCreate()}
                children={""}
            ></Button>
        </View>
    );
};

export default Dashboard;
