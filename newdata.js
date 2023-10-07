import { useEffect, useState } from "react";


import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { Alert, Button, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AutocompleteInput from "react-native-autocomplete-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";







function PostNewDataToMainWarehouse(){

const [items,setItems] = useState("")
const [store,setStore]=useState("")
const [type,setType]=useState("")
const [Quantity,setQuantity]=useState("")
const [error,setError]= useState("")
const [success,setSuccess]= useState()
const clear=()=>{
    setItems("")
    setStore("مخزن بني مزار الرئيسي")
    setType("")
    setQuantity("")
    setError(null)
    setSuccess("تم تسجيل البيانات بنجاح")
    }
    
const PostHandler = async (e)=>{
    const find = await AsyncStorage.getItem("authToken")
    const details = jwtDecode(find)
    if (!details.isAdmin) return ;
    
await axios.post(`${process.env.REACT_APP_BASE_URL}/postnewdatatostore`,{items:items,store:store,type:type,quantity:Quantity},{withCredentials:true}).
then(e=>e.data == "success" ? clear() :setError("يرجى مراعاة ادخال البيانات الصحيحة"))

}


return(

<View style={{paddingTop:Dimensions.get("screen").height/6,backgroundColor:"#ffffff",flex:1,padding:30}} > 
    
<Text style={{fontSize:19,textAlign:"center",color:"red"}}>تسجيل بيانات الجرد</Text>
<TextInput cursorColor="#D71313" focusable style={{paddingBottom:20}}  placeholder="المخزن" value={store} onChangeText={(e)=>setStore(e)}/>
<TextInput cursorColor="#D71313" style={{paddingBottom:20}} placeholder="المهام"  value={items} onChangeText={(e)=>setItems(e)}/>
<TextInput cursorColor="#D71313" style={{paddingBottom:20}}  placeholder="الوحدة"  value={type} onChangeText={(e)=> setType(e)}/>


<TextInput cursorColor="#D71313" style={{paddingBottom:20}} value={Quantity} placeholder="الكمية" keyboardType="number-pad" onChangeText={e=>setQuantity(e)}/>
<TouchableOpacity style={{width:300,flexDirection:"row",justifyContent:"center",alignItems:"center" }}><Button color="#D71313" title="تسجيل البيانات" onPress={PostHandler}>تسجيل بيانات</Button></TouchableOpacity>

{error ? <Text style={{color:"red"}} >خطأ في ادخال البيانات</Text>:null}
{success ? <Text style={{color:"black"}}>تم تسجيل البيانات بنجاح</Text>:null}


</View>









)

}









export default PostNewDataToMainWarehouse;