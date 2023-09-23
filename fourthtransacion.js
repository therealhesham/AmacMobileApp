import axios from "axios"
import { useContext, useEffect, useState } from "react"

import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { contractorsContext , storeNamesContext } from "./datacontext";
import { Picker } from "@react-native-picker/picker";
import { Button, Text, TextInput, View } from "react-native";





export default function Fourth({fromList,data,unit}){
const BASE_URL = process.env.REACT_APP_BASE_URL
  

const [specificitems,setToGetSpecificITems]=useState([])
    const [contractor,setContractor] = useState("")
    const [destination,setDestination] = useState("")
    const [items,setItems] = useState("")
    const [receipt,setReceipt] = useState("")
    const [quantity,setQuantity]=useState("")
    const [type,setType]=useState("")
    const [notExist,setExistense]=useState("")
const [done,setDone]=useState("")



const storeContext=useContext(storeNamesContext)
const contractorNames=useContext(contractorsContext)
const getSpecificData =async (e)   =>{
    // alert(destination)

    await axios.post(`${BASE_URL}/specificdata`,{store:e}).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
    // console.log(destination);
 }

 const Clear =()=>{
    setDone("تم تسجيل البيانات بنجاح") 
setFrom("")
setTypeOfImporter("")
setType("")
setQuantity("")
setItems("")
settypeOfContracting("")



}

const PostHandler=async ()=>{
    try {
        
     
    const find = await AsyncStorage.getItem("authToken")
    const details = jwtDecode(find)
    if (!details.isAdmin) return setExistense("only Admins can change and add new data")
    
    if (!contractor ||  !destination || !quantity || !type || !items || !receipt ) return setExistense("رجاء ملىء البيانات")
await axios.post(`${BASE_URL}/refund`,{contractor:contractor,destination:destination,itens:items,
    quantity:quantity,type:type,receiptno:receipt}).then(e=>{
        e.data == "error" ? setExistense("خطأ في التسجيل ... لا يمكن اضافة مرتجع لمهام غير موجودة بالمخازن ") : Clear()})
    }catch (error) {
        
        }

}
return(
<View>

<TextInput placeholder="رقم الاذن" value={receipt} onChangeText={e=>setReceipt(e)}/>
<Picker

selectedValue={contractor}
// label=؛
onValueChange={(e)=>setContractor(e)}
>
<Picker.Item label="" key={1} value=""  /> 
<Picker.Item label="تنفيذ ذاتي" key={2} value="تنفيذ ذاتي" /> 
{contractorNames.contractor.map(e=><Picker.Item label={e.name} key={e._id} value={e.name} /> )  }


</Picker>
<Text >الى مخزن</Text>
<Picker selectedValue={destination}

onValueChange={(value)=>{
    
    setDestination(value)
    getSpecificData(value)
    
    
}}


>

{storeContext.storeName.map(e=> <Picker.Item value={e.name} label={e.name} key={e._id}/>)  }




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

<Button   title="تسجيل البيانات" onPress={PostHandler} /> 






</View> 






)


}