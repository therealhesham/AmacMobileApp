

import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";

import { Button, FlatList, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message'
import ListComponen from "./firsttransactionmemo";
import {  Searchbar } from 'react-native-paper'



export default function Thirdtransaction (){
const [from , setFrom]= useState("")
const [date,setDate]=useState("")
const [to,setTo]=useState("")
const [items,setItems]=useState("")
const [toList ,setToList] = useState([]);
const [type,setType]=useState("");
const [quantity,setQuantity]= useState("");
const [notExist,setExistense]=useState(null);
const [specificitems,setToGetSpecificITems]=useState([]);
const [receipt,setReceipt]=useState("");
const [specificUnite,setSpecificUnite]=useState();
const [done,setDone]=useState("");
const [storeList,setToStoreList]=useState([]);
const [data,setData]=useState([]);
const [storeaNames,setStoreNames]=useState([])
const [searchedData,setSearchData]=useState([]);

    // Toast.hide({text1:done,type:"success"})
  const fetchDate  =async()=>{
   await fetch(`https://reactnativebackend.onrender.com/preview`,{method:"get"}).then(e=>e.json()).then(e=> setData(e));
    await fetch(`https://reactnativebackend.onrender.com/listofstores`,{method:"get"}).then(e=>e.json()).then(e=> setStoreNames(e))
  }
    useEffect(()=>{
        
       fetchDate();
      },[])        

const toasterExistance= (e)=>{setExistense(e)
Toast.show({text1:e,type:"error"})
}

function toasterDone(e){
    Clear()
    setDone(e)
    Toast.show({text1:e,type:"success"})
      }
const postHandler = async (e)=>{
try {
    

    const find = await AsyncStorage.getItem("authToken")
    const details = jwtDecode(find)
if (!details.isAdmin) return toasterExistance("only Admins can change and add new data")

  
if (!from ||  !to || !quantity || !type || !items || !receipt ) return  toasterExistance("رجاء ملىء البيانات")
if (from === to )   return toasterExistance("غير المخزن المحول منه او له") ;

 await axios.post(`${process.env.REACT_APP_BASE_URL}/thirdtransaction`,{receiptno:receipt,date:date,from:from,to:to,items:items,unit:type,quantity:quantity}).then(e=>
    e.data == "error" ? toasterExistance("  خطأ في التسجيل ... المهام غير متاحة بالمخزن المحول اليه او قد يكون الكمية في المخزن المحول منه اقل من المطلوب ") : toasterDone("تم تسجيل البيانات بنجاح"))
 }catch (error) {

    toasterExistance("Authentication or Internet Error ")
    }  
}

const getSpecificData =  (e)   =>{
    setFrom(e)        
    const mapper = data.filter(s=>s.store === e)
    setToGetSpecificITems(mapper)
   
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
  const uniteGetter=(n,s)=>{
    try {
      setItems(s)
      const mapper= specificitems.filter(e=>e._id == n );
      setType(mapper[0].type)
       
    } catch (error) {
      toasterExistance("المهام غير موجودة")
    }
    }
    const Search = (E)=>{
    
    
    
        const mapper = specificitems.filter(e=>e.items.includes(E))
    
        setSearchData(mapper)
            }
    
    // specificitems.length=10
return (
 
<View style={{backgroundColor:"#ffffff",padding:5}}>

<TextInput placeholder="رقم الاذن" keyboardType="numeric" value={receipt}  onChangeText={e=>setReceipt(e)}/>


<TextInput  autoFocus placeholder="التاريخ"  keyboardType="default" style={{ opacity:1 ,right:"auto",height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}  
   value={date} onChange={e=>setDate(e.persist())}/>
<Picker selectedValue={from}

onValueChange={(value)=>{
    
    setFrom(value)
    getSpecificData(value)
    
    
}}


>
<Picker.Item value="من مخزن" enabled={false} label="من مخزن" key={1}/>
{/* <Picker.Item> */}
{storeaNames.map(e=> <Picker.Item value={e.name} label={e.name} key={e._id}/>)  }
{/* </Picker.Item> */}



</Picker>


<Picker selectedValue={to}

onValueChange={(value)=>{
setTo(value)

}}

>
<Picker.Item value="الى مخزن" disabled label="الى مخزن" key={1}/>
{/* <Picker.Item> */}
{storeaNames.filter(e=> e.name !== from ).map(e=> <Picker.Item value={e.name} label={e.name} key={e._id}>{e.name}</Picker.Item>)  }
{/* </Picker.Item> */}



</Picker>


<View style={{width:300,alignSelf:"center"}}>
{items?<Text style={{height:50, opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}>{items}</Text>:null}
{type?<Text style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}>{type}</Text>:null}
</View>

<TextInput placeholder="الكمية" keyboardType="numeric"  value={quantity} onChangeText={(e)=>setQuantity(e)}/>
{/* <TouchableOpacity style={{width:300,flexDirection:"row",justifyContent:"center",alignItems:"center" }}> */}
    <TouchableOpacity style={{paddingTop:20}}><Button color="#D71313" title="تسجيل البيانات"   onPress={postHandler}/></TouchableOpacity>
    {/* </TouchableOpacity> */}
    
{ notExist ? <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}

      />:null}
    { done ?    <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}
      />:null} 

   
{specificitems.length >0?
    <KeyboardAvoidingView


>
<Searchbar
focusable={false}
style={{height:50, marginBottom:3,opacity:.9}}
      placeholder="البحث عن المهام من هنا"
      onChangeText={(query)=>Search(query)}
 
    />


<View >
  <FlatList
          
// initialNumToRende={10}
//   maxToRenderPerBatch={10}
  initialNumToRender={2}
  
   style={{height:200 }} 
keyExtractor={(e,index)=>e._id}
data={searchedData.length > 0 ?searchedData:specificitems}
renderItem={e=> <ListComponen uniteGetter={(e,d)=>uniteGetter(e,d)} id={e.item._id}  item={e.item.items}/> }/>

 </View>
    </ KeyboardAvoidingView>:""}



    </View>

)




}