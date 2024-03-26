import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ButtonProps as RNButtonProps } from "react-native-paper";

interface ButtonProps extends RNButtonProps {
    variant: "text" | "contained" | "outlined" | "elevated" | "contained-tonal";
    children: React.ReactNode;
    onPress: () => void;
}

const AppButton: React.FC<ButtonProps> = ({
    variant,
    children,
    onPress,
    ...buttonProps
}) => {
    return (
        <Button
            mode={variant}
            onPress={onPress}
            style={styles.buttonBox}
            labelStyle={styles.labelStyle}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

// Estilos do componente
const styles = StyleSheet.create({
    buttonBox: {
        height: 30,
        marginVertical: 0,
        marginHorizontal: 0,
        padding: 0,
    },
    labelStyle: {
        fontSize: 12,
        padding: 0,
        margin: 0,
        marginVertical: 5,
        marginHorizontal: 10,
    },
});

export default AppButton;
