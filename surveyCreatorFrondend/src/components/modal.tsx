import React from "react";
import {
    Modal,
    StyleSheet,
    ModalProps as RNModalProps,
    View,
    Dimensions,
} from "react-native";

interface ModalProps extends RNModalProps {
    visibility: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    children: React.ReactNode;
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const AppModal: React.FC<ModalProps> = ({
    visibility,
    children,
    ...modalProps
}) => {
    const [isVisible, setIsVisible] = visibility;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
            {...modalProps}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>{children}</View>
                </View>
            </View>
            {children}
        </Modal>
    );
};

// Estilos do componente
const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
        justifyContent: "center",
        alignItems: "center",
        width: screenWidth,
        height: screenHeight,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default AppModal;
