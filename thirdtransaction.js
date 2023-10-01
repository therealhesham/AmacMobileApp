

import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";

import { Button, FlatList, KeyboardAvoidingView, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message'
import ListComponen from "./firsttransactionmemo";
import {  Searchbar } from 'react-native-paper'
import { ScrollView } from "react-native";
import { Alert } from "react-native";




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
const [searchQuery, setSearchQuery] = useState("");
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
const getSpecificData = async (e)   =>{
  
  try {
    setSearchData("")
      //   setDestination(e)
      setTo(e)        
      
const mapper = data.filter(s=>s.store === e)



setToGetSpecificITems(mapper)

setSearchQuery("")

  } catch (error) {
    console.log("error")
  }
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
function alertComponent(){ 
  Alert.alert("تنبيه","المهام غير موجودة باحد المخزنين ..  في حالة التأكد من وجودهما الفعلي .. قد يكون هذا الخطأ ناتج عن تسجيل نفس المهام باسماء مختلفة لذا راجع فريق الدعم الفني",[
    {
      text: 'موافق',
      onPress: () => console.log('Ask me later pressed'),
    }])}
      
const uniteGetter=(n,s)=>{
  try {


const datafirst = data.filter(e=> e.store == from).filter(e=> e.items == s);
const dataSecond = data.filter(e=> e.store == to).filter(e=> e.items == s);
const al = datafirst.length;
const as = dataSecond.length;
if (!al  || !as) return alertComponent();
      setItems(s)
      const mapper= specificitems.filter(e=>e._id == n );
      setType(mapper[0].type)
      setSearchQuery(mapper[0].items)
      // toasterExistance(`${mapper[0].store}  يتضمن ${mapper[0].quantity} ${mapper[0].type} من المهام المحددة`)
      setSearchData([])
    } catch(error) {
      toasterExistance("المهام غير موجودة")
    }
    }
    


    const Search = (E)=>{
    
    
    setSearchQuery(E)
        const mapper = specificitems.filter(e=>e.items.includes(E))
    
        setSearchData(mapper)
            }
    
    // specificitems.length=10
return (
    // <ScrollView horizontal={false} style={{flex: 1}}> 
    <View style={{backgroundColor:"#ffffff",padding:30,flex:1}}>

<TextInput placeholder="رقم الاذن" keyboardType="numeric" value={receipt}  onChangeText={e=>setReceipt(e)}/>


<TextInput  autoFocus placeholder="التاريخ"  keyboardType="default" style={{ opacity:1 ,right:"auto",height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}  
   value={date} onChange={e=>setDate(e)}/>
<Picker selectedValue={from}

onValueChange={(value)=>{
    
    setFrom(value)
    
}}


>
<Picker.Item value="من مخزن" enabled={false} label="من مخزن" key={1}/>

{storeaNames.map(e=> <Picker.Item value={e.name} label={e.name} key={e._id}/>)  }




</Picker>


<Picker selectedValue={to}

onValueChange={(value)=>{
setTo(value)
getSpecificData(value)
    
    
}}

>
<Picker.Item value="الى مخزن" disabled label="الى مخزن" key={1}/>
{/* <Picker.Item> */}
{storeaNames.filter(e=> e.name !== from ).map(e=> <Picker.Item value={e.name} label={e.name} key={e._id}>{e.name}</Picker.Item>)  }
{/* </Picker.Item> */}



</Picker>


{to && from?<Searchbar

onClearIconPress={()=>{
      setItems("");
      
      setType("");
      
      setSearchData([]);
    }}
      style={{height: 50, marginBottom:3,opacity:items ? 4 : .4,borderRadius:2,backgroundColor:"white"}}
      placeholder="اكتب اسم المهام وانتظر الاقتراحات"
      onChangeText={(query)=>Search(query)}
      value={searchQuery}
    />

:<Text>اختيار المخزن لاظهار قائمة المهام تلقائيا</Text>}

<View >
  <FlatList
          // scrollEnabled={true}
  // horizontal={true}
  initialNumToRender={10}
  
   style={{ backgroundColor:"white",paddingTop:2,zIndex:10,elevation:50}} 
keyExtractor={(e,index)=>e._id}
data={searchedData.length > 0 ?searchedData:[]}
renderItem={e=> <ListComponen uniteGetter={(e,d)=>uniteGetter(e,d)} setSpecificItem={setToGetSpecificITems} id={e.item._id}  key={e.item._id} item={e.item.items}/> }/>

 </View>


<View style={{width:300,alignSelf:"center"}}>
{items?<Text style={{height:50, opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}>{items}</Text>:null}
{type?<Text style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}>{type}</Text>:null}
</View>

<TextInput placeholder="الكمية" keyboardType="numeric"  value={quantity} onChangeText={(e)=>setQuantity(e)}/>

    <TouchableOpacity style={{paddingTop:20}}><Button color="#D71313" title="تسجيل البيانات"   onPress={postHandler}/></TouchableOpacity>

    
{ notExist ? <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}

      />:null}
    { done ?    <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}
      />:null} 

</View>

 

)




}
