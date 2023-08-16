

import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
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
const [notExist,setExistense]=useState(null);
const [specificitems,setToGetSpecificITems]=useState([]);
const [receipt,setReceipt]=useState("");
const [specificUnite,setSpecificUnite]=useState();
const [done,setDone]=useState(null);
const [storeList,setToStoreList]=useState([]);
const storeContext=useContext(storeNamesContext)

const postHandler =async (e)=>{
// try {
    

// } catch (error) {
    
// }
    const find = await AsyncStorage.getItem("authToken")
    const details = jwtDecode(find)
if (!from ||  !to || !quantity || !type || !items || !receipt ) return setExistense("رجاء ملىء البيانات")
if (from === to ) return setExistense("من فضلك غير احد المخزنين")
await axios.post(`${process.env.REACT_APP_BASE_URL}/thirdtransaction`,{user:details.username,receiptno:receipt,from:from,to:to,items:items,type:type,quantity:quantity}).then(e=>
    e.data == "error" ? setExistense("  خطأ في التسجيل ... المهام غير متاحة بالمخزن المحول اليه او قد يكون الكمية في المخزن المحول منه اقل من المطلوب ") : Clear())
    
}

const getSpecificData = (e)   =>{
    // alert(destination)
    setFrom(e)
// ss
     axios.post(`${process.env.REACT_APP_BASE_URL}/specificdata`,{store:e}).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
    // console.log(destination);
   
 }
 const Clear =()=>{
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
Toast.show({text1:notExist,type:"error"})
Toast.hide({text1:done,type:"success"})
// Toast.show({
//     type: 'info',
//     text1: 'This is an info message'
//   })
 const toStores =(s) =>{

    const stores = storeContext.storeName.filter(e=> e != from )   
    setToStoreList(stores)
  } 
return (
<View style={{padding:21,color:"white"}}>

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
<TouchableOpacity style={{width:300,flexDirection:"row",justifyContent:"center",alignItems:"center" }}>
    <Button color="#D71313" title="تسجيل البيانات" onPress={postHandler}/></TouchableOpacity>
    
{ notExist ? <Toast onPress={()=>Toast.hide()}
        position='bottom'
        bottomOffset={3}
      />:null}
    { done ?    <Toast onPress={()=>Toast.hide()}
        position='bottom'
        bottomOffset={3}
      />:null}

   


    </View>


)




}