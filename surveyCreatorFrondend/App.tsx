import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Login from "./src/screens/login";
import theme from "./src/assets/theme";
import CreateSurveyScreen from "./src/screens/survey-creation";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./src/screens/dashboard";
import { createStackNavigator } from "@react-navigation/stack";
import UserDashboard from "./src/screens/answerSurvey/indesx";
import AnswerSurvey from "./src/screens/answerSurvey/indesx";

const Stack = createStackNavigator();

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen
                        name="UserDashboard"
                        component={UserDashboard}
                    />
                    <Stack.Screen
                        name="SurveyEditCreate"
                        component={CreateSurveyScreen}
                    />
                    <Stack.Screen
                        name="AnswerSurvey"
                        component={AnswerSurvey}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
