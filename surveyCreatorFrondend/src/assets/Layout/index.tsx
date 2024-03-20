import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const Layout = ({ children }) => {
    const { colors } = useTheme();

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4b0081",
    },
});

export default Layout;
