import { Platform } from "react-native";

let Modal;

if (Platform.OS !== 'web') {
  Modal = require('react-native').Modal;
} else {
  Modal = require('modal-react-native-web');
}

export default Modal;