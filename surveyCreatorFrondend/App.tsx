import { StyleSheet, View } from "react-native";
import Login from "./src/screens/login";

export default function App() {
    return (
        <View style={styles.container}>
            {/* <Text>
                Open up App.js to start working on your app! testetetete
                atualizou
            </Text>
            <Button title="teste"></Button>
            <StatusBar style="auto" /> */}

            <Login></Login>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
