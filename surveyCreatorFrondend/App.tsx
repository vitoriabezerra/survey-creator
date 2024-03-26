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
import SurveyDataScreen from "./src/screens/surveyData";
import Home from "./src/screens/home";
import SignUpScreen from "./src/screens/signUp";

const Stack = createStackNavigator();
export default function App() {
    return (
        <ApolloProvider client={client}>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
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
                        <Stack.Screen
                            name="SurveyData"
                            component={SurveyDataScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </ApolloProvider>
    );
}
