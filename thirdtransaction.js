

import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { REACT_APP_DEV_MODE, REACT_APP_PROD_MODE } from "@env"
import { storeNamesContext } from "./datacontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message'




export default function Thirdtransaction (){
const [from , setFrom]= useState("")
const [to,setTo]=useState("")
const [items,setItems]=useState("")
const [toList ,setToList] = useState([]);
const [type,setType]=useState("");
const [quantity,setQuantity]= useState("");
const [notExist,setExistense]=useState("");
const [specificitems,setToGetSpecificITems]=useState([]);
const [receipt,setReceipt]=useState("");
const [specificUnite,setSpecificUnite]=useState();
const [done,setDone]=useState("");
const [storeList,setToStoreList]=useState([]);
const storeContext=useContext(storeNamesContext)

    // Toast.hide({text1:done,type:"success"})
        

const toasterExistance= (e)=>{setExistense(e)
Toast.show({text1:e,type:"error"})
}

function toasterDone(e){
    Clear()
    setDone(e)
    Toast.show({text1:e,type:"success"})
      }
const postHandler = (e)=>{

// try {
    // console.log("sss")

// } catch (error) {
    
// }
    // const find = await AsyncStorage.getItem("authToken")
    // const details = jwtDecode(find)
if (!from ||  !to || !quantity || !type || !items || !receipt ) return  toasterExistance("رجاء ملىء البيانات")
if (from === to )   return toasterExistance("غير المخزن المحول منه او له") ;
 axios.post(`${process.env.REACT_APP_BASE_URL}/thirdtransaction`,{receiptno:receipt,from:from,to:to,items:items,type:type,quantity:quantity}).then(e=>
    e.data == "error" ? toasterExistance("  خطأ في التسجيل ... المهام غير متاحة بالمخزن المحول اليه او قد يكون الكمية في المخزن المحول منه اقل من المطلوب ") : toasterDone("تم تسجيل البيانات بنجاح"))
    
}

const getSpecificData =  (e)   =>{
    // alert(destination)
    setFrom(e)
// ss
     axios.post(`${process.env.REACT_APP_BASE_URL}/specificdata`,{store:e}).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
    // console.log(destination);
   
 }
 function Clear (){
    setDone("تم تسجيل البيانات بنجاح") 
    setFrom("")
    setReceipt("")
    setTo("")
    setType("")
    setQuantity("")
    setItems("")
    setToList("")
    
 }
 function Check(){



    
    

}
Toast.show({
    type: 'info',
    text1: done
  })
 const toStores =(s) =>{

    const stores = storeContext.storeName.filter(e=> e != from )   
    setToStoreList(stores)
  } 
return (
    // <TouchableWithoutFeedback>
<View style={{padding:21,color:"white"} }>

<TextInput placeholder="رقم الاذن" value={receipt} onChangeText={e=>setReceipt(e)}/>

<Text> من مخزن</Text>
<Picker selectedValue={from}

onValueChange={(value)=>{
    
    setFrom(value)
    getSpecificData(value)
    
    
}}

onBlur={toStores}
>
{/* <Picker.Item> */}
{storeContext.storeName.map(e=> <Picker.Item value={e} label={e} key={e}/>)  }
{/* </Picker.Item> */}



</Picker>

<Text >الى مخزن</Text>
<Picker selectedValue={to}

onValueChange={(value)=>{
setTo(value)

}}

>
{/* <Picker.Item> */}
{storeList.map(e=> <Picker.Item value={e} label={e} key={e}>{e}</Picker.Item>)  }
{/* </Picker.Item> */}



</Picker>

<Text > المهام</Text>
<Picker selectedValue={items}

onValueChange={(value)=>{
setItems(value)

}}

>
{/* <Picker.Item> */}
{specificitems.map(e=> <Picker.Item value={e.items} label={e.items}   key={e._id}/>)  }
{/* </Picker.Item> */}



</Picker>
<Picker
// onFocus={openUnitRef}
// onBlur={closeUnitRef}

selectedValue={type}
onValueChange={(itemValue, itemIndex) =>
    setType(itemValue)

}  


>



<Picker.Item label="م/ط" key={1} value="م/ط"/>
<Picker.Item label="عدد" key={2} value="عدد"/>

<Picker.Item label="طن" value={3}  key={3}/>




</Picker>
<TextInput placeholder="الكمية" keyboardType="numeric"  value={quantity} onChangeText={(e)=>setQuantity(e)}/>
{/* <TouchableOpacity style={{width:300,flexDirection:"row",justifyContent:"center",alignItems:"center" }}> */}
    <Button color="#D71313" title="تسجيل البيانات"   onPress={postHandler}/>
    {/* </TouchableOpacity> */}
    
{ notExist ? <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}

      />:null}
    { done ?    <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}
      />:null} 

   


    </View>
/* </Touchableop> */

)




}