import axios from "axios"
import { useContext, useEffect, useState } from "react"

import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { contractorsContext , storeNamesContext } from "./datacontext";
import { Picker } from "@react-native-picker/picker";
import { Button, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
import ListComponen from "./firsttransactionmemo";
import { FlatList } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native";






export default function Fourth({fromList,unit}){

    const BASE_URL = process.env.REACT_APP_BASE_URL
  
const [searchedData,setSearchData]=useState([]);
const [date,setDate]=useState("");
const [specificitems,setToGetSpecificITems]=useState([])
    const [contractor,setContractor] = useState("")
    const [destination,setDestination] = useState("")
    const [items,setItems] = useState("")
    const [receipt,setReceipt] = useState("")
    const [storeNames,setStoreNames]=useState([])
    const [data,setData]=useState([])
    const [quantity,setQuantity]=useState("")
    const [type,setType]=useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const [notExist,setExistense]=useState("")
const [done,setDone]=useState("")

const [contractorNames,setContractorNames]=useState([])

const fetchStores = async()=>{
    try {
        await fetch(`https://reactnativebackend.onrender.com/listofnames`,{method:"get"}).then(e=>e.json()).then(e=> setContractorNames(e))
   
        await fetch(`https://reactnativebackend.onrender.com/preview`,{method:"get"}).then(e=>e.json()).then(e=> setData(e));
        await fetch(`https://reactnativebackend.onrender.com/listofstores`,{method:"get"}).then(e=>e.json()).then(e=> setStoreNames(e))
           
    } catch (error) {
  toasterExistance("Network Error")      
    }
    
  }  

  function toasterExistance(e){
    setExistense(e)
  Toast.show({text1:e,type:"error"});
  }
  function toasterDone(e){
    Clear()
    
    Toast.show({text1:e,type:"success"})
      }

  useEffect(()=>{


fetchStores()

  },[])


    

  const getSpecificData = async (e)   =>{
  
    try {
      console.log(e)
        //   setDestination(e)
        setContractor(e)        
const mapper = data.filter(s=>s.store === e)
setToGetSpecificITems(mapper)

setSearchQuery("")

    } catch (error) {
      console.log("error")
    }
    
      
   }
 const Clear =()=>{
    toasterDone("تم تسجيل البيانات بنجاح") 
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
    
    if (!contractor ||  !destination ||date|| !quantity || !type || !items || !receipt ) return toasterExistance("رجاء ملىء البيانات")
await axios.post(`${BASE_URL}/refund`,{contractor:contractor,destination:destination,itens:items,
    quantity:quantity,type:type,date:date,receiptno:receipt}).then(e=>{
        e.data == "error" ? toasterExistance("خطأ في التسجيل ... لا يمكن اضافة مرتجع لمهام غير موجودة بالمخازن ") : Clear()})
    }catch (error) {
        
        }

}

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

return(
    <ScrollView horizontal={false} style={{flex: 1}}> 
    <ScrollView behavior="position" style={{backgroundColor:"#ffffff",padding:30}}>

<TextInput placeholder="رقم الاذن" value={receipt} onChangeText={e=>setReceipt(e)}/>

<TextInput  autoFocus placeholder="التاريخ"  keyboardType="default" style={{ opacity:1 ,right:"auto",height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}  
   value={date} onChange={e=>setDate(e.persist())}/>

<Picker

height={300}
style={{lineHeight:30}}
selectedValue={contractor}
// label=؛
onValueChange={(e)=>setContractor(e)}
>

    <Picker.Item  label="حدد اسم المقاول من القائمة" value="اختر المقاول" enabled={false} key={1}/>
{contractorNames.map(e=><Picker.Item label={e.name} key={e._id} value={e.name} /> )  }


</Picker>

<Picker selectedValue={destination}

onValueChange={(value)=>{
    
    setDestination(value)
    getSpecificData(value)
    
    
}}


>
<Picker.Item  label="اختر المخزن من القائمة" value="اختر المخزن" enabled={false} key={1}/>
{storeNames.map(e=> <Picker.Item value={e.name} label={e.name} key={e._id}/>)  }




</Picker>


<View style={{width:300,alignSelf:"center"}}>
{items?<Text style={{height:50, opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}>{items}</Text>:null}
{type?<Text style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}>{type}</Text>:null}
</View>

<TextInput style={{paddingBottom:6}} placeholder="الكمية" keyboardType="numeric"  value={quantity} onChangeText={(e)=>setQuantity(e)}/>

<Button   title="تسجيل البيانات" onPress={PostHandler} /> 

{ notExist ? <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}

      />:null}
    { done ? <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}

      /> :null} 


   
{specificitems.length >0?
    <View


>
<Searchbar
focusable={false}
style={{height:50, marginBottom:3,opacity:.9}}
      placeholder="البحث عن المهام من هنا"
      onChangeText={(query)=>Search(query)}
 
    />


<View >
  <FlatList
          scrollEnabled={false}
// initialNumToRende={10}
//   maxToRenderPerBatch={10}
  initialNumToRender={2}
  
   style={{height:200 }} 
keyExtractor={(e,index)=>e._id}
data={searchedData.length > 0 ?searchedData:specificitems}
renderItem={e=> <ListComponen uniteGetter={(e,d)=>uniteGetter(e,d)} id={e.item._id}  item={e.item.items}/> }/>

 </View>
 </View>:<Text>قائمة المهام ستظهر هنا بعد اختيار المخزن</Text>}
</ScrollView>

    </ScrollView>





)


}