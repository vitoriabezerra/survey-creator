import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const AppLayout = ({ children }) => {
    return <SafeAreaView style={[styles.container]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
    },
});

export default AppLayout;
