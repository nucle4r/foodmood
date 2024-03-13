import React, { Component } from "react";
import { StyleSheet, View, Modal, Image, Text } from "react-native";

const messages = [
  "Patience is the key to unlocking the power of technology.",
  "Loading... because good things come to those who wait.",
  "The wait is worth it when it comes to quality technology.",
  "Loading... because great things take time.",
  "Technology is working hard behind the scenes to bring you the best experience possible.",
  "Computing the impossible, please wait...",
  "Loading... but trust us, it's worth it.",
  "Innovation takes time. Thanks for waiting.",
  "The future is loading... one moment please.",
  "Preparing the awesomeness. Please be patient.",
];

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading,
      message: messages[Math.floor(Math.random() * messages.length)],
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      isLoading: nextProps.isLoading,
    };
  }

  render() {
    return (
      <Modal
        transparent={true}
        animationType={"none"}
        visible={this.state.isLoading}
        style={{ zIndex: 1100 }}
        onRequestClose={() => {}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            {/* <ActivityIndicator animating={this.state.isLoading} color="black" /> */}

            {/* If you want to image set source here */}
            <Image
              source={require("../assets/load.gif")}
              style={{ height: 128, width: 128 }}
              resizeMode="contain"
              resizeMethod="resize"
            />

            <Text style={styles.textStyle}>"{this.state.message}"</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 260,
    width: 320,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textStyle: {
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    fontSize: 18,
    fontStyle: "italic",
  },
});

export default Loader;