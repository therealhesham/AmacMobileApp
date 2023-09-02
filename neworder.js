import { SafeAreaView, Text, TextInput, TextInputComponent, View } from "react-native";
import * as Notification from 'expo-notifications'
import axios from "axios";



function Order(){
    

       async function token(){
    const token = await Notification.getExpoPushTokenAsync()


}
return(
<View>
<TextInput></TextInput>


</View>



)



}

export default Order;