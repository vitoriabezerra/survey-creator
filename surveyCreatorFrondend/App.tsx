import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Login from "./src/screens/login";
import theme from "./src/assets/theme";
import CreateSurveyScreen from "./src/screens/survey-creation";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./src/screens/dashboard";
import { createStackNavigator } from "@react-navigation/stack";
import UserDashboard from "./src/screens/answerSurvey";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import AnswerSurveyScreen from "./src/screens/answerSurvey";

const Stack = createStackNavigator();
export default function App() {
    return (
        <ApolloProvider client={client}>
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
                            component={AnswerSurveyScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </ApolloProvider>
    );
}
