import axios from "axios";
// AppState
import { useContext, useEffect, useState } from "react";
import { View,Text, TextInput,Image, SafeAreaView, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView, StyleSheet, Button, AppState } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from "./context";
import { MailOutlined } from "@ant-design/icons";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = (props) => {
    const authenticate =useContext(auth)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const contextUser=useContext(auth)
    

    const [error,setError]=useState()
    const storage= async ()=>{
try {
    
} catch (error) {
    
}
        
    }
            
            
    const postData    =async()=>{
try {
    
    const {data} =await axios.post(`https://reactnativebackend.onrender.com/login`,{email,password})
    await AsyncStorage.setItem("authToken",data.authtoken)
// props.navigation.navigate("Home")
authenticate.setUser(data.authtoken)
        
} catch (error) {
    
}

}

// console.log(AsyncStorage.getItem("authToken"))
const dim = Dimensions.get("screen").height/2
// I18nManager.allowRTL(false)

return ( <SafeAreaView style={{backgroundColor:"white"}}>
    
    {/* <TouchableOpacity style={{backgroundColor:"white"}}> */}
 <KeyboardAvoidingView   behavior="position" keyboardVerticalOffset={200} style={styles.container}>
 <View style={{alignItems:"center",flexDirection:"column"}} ><Image style={{width:100,height:101,marginBottom:1}} source={require('./assets/download.jpg')}  /></View>
 <TextInput  autoFocus
  placeholder= "  Email"  value={email} onChangeText={(e)=>setEmail(e)}
  style={{  borderRadius:19, backgroundColor: "lavender" , width:300 , height:35 , marginBottom:10}} secureTextEntry={false} />   
 <TextInput placeholder="  Password" value={password} 
 onChangeText={(e)=>setPassword(e)} 
 style={{  borderRadius:19, backgroundColor: "lavender" , width:300 , height:35,marginBottom:10}}
  secureTextEntry={true} />
<View>{error?<Text style={{color:"red"}}>{error}</Text> :null}</View>
 <Button title="Submit" style={{width:"50 px"}} onPress={postData} ></Button>
 
 </KeyboardAvoidingView>
 {/* </TouchableOpacity> */}
    
 
     </SafeAreaView> );


}
const styles = StyleSheet.create({container:

    {paddingTop: Dimensions.get("screen").height/3,width:100,paddingLeft: 20 , flexDirection:"column",alignItems:"flex-start",backgroundColor:"white"

}
}) 
export default Login;