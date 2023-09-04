import axios from "axios";
// AppState
import { useContext, useEffect, useState } from "react";
import { View,Text, TextInput, SafeAreaView, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView, StyleSheet, Button, AppState } from "react-native";
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
            // useEffect(()=>
            // jwtDecode(await AsyncStorage.getItem("authtoken"))? props.navigation.navigate("Preview"):null
            
            // )
            
    const postData    =async()=>{
try {
    
    const {data} =await axios.post(`https://d021-196-133-126-25.ngrok-free.app/login`,{email,password})
    await AsyncStorage.setItem("authToken",data.authtoken)
    // AsyncStorage.clear()

    // then(({data})=>data.authtoken?AsyncStorage.setItem
    
    
    
    
    // authenticate.setUser(AsyncStorage.getItem("authToken"))
    console.log(await AsyncStorage.getItem("authToken"))
    
        
} catch (error) {
    
}

// await fetch("http://b8d8-196-133-9-14.ngrok-free.app/login",
    // {method:"POST",  headers: {
    //     'Accept': 'application/json',
    //     'content-type': 'application/json'
    //   },body:{email,password},credentials:true}).then((e)=>console.log(e.json))
    
// {await AsyncStorage.getItem("authToken")?props.navigation.replace("Home"):setError("خطأ في البيانات")}
    // if(contextUser.user) return props.navigation.navigate("Preview")
    // if(!contextUser.user)

}

// console.log(AsyncStorage.getItem("authToken"))
const dim = Dimensions.get("screen").height/2
// I18nManager.allowRTL(false)

return ( <SafeAreaView >
    
    <Text>Login
        
    </Text>
    <TouchableOpacity style={{backgroundColor:"wheat"}}>
 <KeyboardAvoidingView   behavior="position" keyboardVerticalOffset={200} style={styles.container}>
 
 <TextInput placeholder= "Email"  value={email} onChangeText={(e)=>setEmail(e)}
  style={{  borderRadius:19, backgroundColor: "white" , width:300 , height:35 , marginBottom:10}} secureTextEntry={false} />   
 <TextInput placeholder="Password" value={password} 
 onChangeText={(e)=>setPassword(e)} 
 style={{  borderRadius:19, backgroundColor: "white" , width:300 , height:35,marginBottom:10}}
  secureTextEntry={true} />
<View>{error?<Text style={{color:"red"}}>{error}</Text> :null}</View>
 <Button title="Submit" style={{width:"50 px"}} onPress={postData} ></Button>
 </KeyboardAvoidingView>
 </TouchableOpacity>
    


     </SafeAreaView> );


}
const styles = StyleSheet.create({container:

    {paddingTop: Dimensions.get("screen").height/2,width:100,paddingLeft: 20 , backgroundColor:"red",flexDirection:"column",alignItems:"flex-start"

}
}) 
export default Login;