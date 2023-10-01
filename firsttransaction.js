import { memo, useContext, useEffect, useMemo, useState } from "react";
import DatePicker from "expo-datepicker";
// import Autocomplete from "react-native-autocomplete-input";
import axios from "axios";
import ListComponen from './firsttransactionmemo';
import DateTimePicker ,{DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { Alert, Button, KeyboardAvoidingView,ImageBackground,Text, TextInput, View,FlatList, Pressable, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AutocompleteInput from "react-native-autocomplete-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Datacontext, storeNamesContext } from "./datacontext";
import Toast from 'react-native-toast-message';
import {  Searchbar } from 'react-native-paper';

export default function FirstTransaction(props){
  
  const toasterExistance= (e)=>{
    
    setExistense(e);
    
  Toast.show({text1:e,type:"error"});
  // setFrom("")
  // setTo("")
  // setExistense("")
  // setType("")
  // setQuantity("")
  // setItem("")

}



  const toasterDone =(e)=>{
    Clear()
    setDone(e)
    Toast.show({text:e,type:"success"})
      }
  function Clear (){
    // setDone("تم تسجيل البيانات بنجاح") 
setFrom("")
setTo("")
setExistense("")
setType("")
setQuantity("")
setItem("")
}
function clearProps(){
setFrom("")
setTo("")
// setExistense("")
setType("")
setQuantity("")
setItem("")
}



const ref = useRef(0)
const [transactionType,setTransactionType]=useState("")
const[from,setFrom]=useState("")
const refFocus =useRef()
const [searchQuery, setSearchQuery] = useState("");
const[to,setTo]=useState("")
const[type,setType]=useState("")
const [unit,setUnit]=useState([])
const [quantity,setQuantity]=useState(0)
const [destination ,setDestination ] =useState("")
const [item,setItem]=useState("")
const [notExist,setExistense]=useState("")
const [store,setStore]=useState(destination)
const [factories,setFactories]=useState([])
const receiptRef = useRef();

const [fromList,setFromList]=useState([])
const [storeNames,setStoreNames]=useState([])
const [data,setData]=useState([])
const [done,setDone]=useState(null)
const [alert,setAlert] = useState("")
const [receipt,setReceipt]=useState(0)
const [specificitems,setToGetSpecificITems]=useState([])
const [timestamp ,settimeStamp]=useState(1616608200000)
// const [date, setDate] = useState(new Date().toString());
const [date, setDate] = useState("");
const [specificUnite,setSpecificUnite]=useState({})
const usecontext = useContext(Datacontext)
const useNameStoreContext=useContext(storeNamesContext)


const [word,setWord]=useState()
const [searchedData,setSearchData]=useState([]);

const uniteGetter=(n,s)=>{
  try {
          

      setItem(s)
      const mapper= specificitems.filter(e=>e._id == n );
      setType(mapper[0].type)
      setSearchQuery(mapper[0].items)
      toasterExistance(`${mapper[0].store}  يتضمن ${mapper[0].quantity} ${mapper[0].type} من المهام المحددة`)
      setSearchData([])
    } catch(error) {
      toasterExistance("المهام غير موجودة")
    }
    }
    

function receiptInputFocus() {
  return receiptRef.current.focusTextInput;
}
function receiptInputBlur() {
  receiptRef.current.blur();
}

function closeRefPicker() {
  receiptRef.current.blur();
}
 const Search = (E)=>{
  setSearchQuery(E)
    
    // console.log(`${s.target.value}`.trim());
    const mapper = specificitems.filter(e=>e.items.includes(E))

    // .includes("سلاقوس")
    
    // data.filter((e)=>e.includes("مواسير"))
    // console.log(newData);
    
    setSearchData(mapper)
        }

// const [factories,setFactories]=useState([])
         async function getDatas(){
           await axios.get(`https://reactnativebackend.onrender.com/listoffactories`,{withCredentials:true}).then((e) => 
          setFactories(e.data)
          )}
           fetchStores = async()=>{
          await fetch(`https://reactnativebackend.onrender.com/listofstores`,{method:"get"}).then(e=>e.json()).then(e=> setStoreNames(e))
           
          }

           fetchNames =async ()=>{
            await fetch(`https://reactnativebackend.onrender.com/preview`,{method:"get"}).then(e=>e.json()).then(e=> setData(e))
         
        }
        useEffect(()=>{
getDatas()
fetchNames()
fetchStores()

        },[])


const pickUnitRef= useRef();

function openUnitRef() {
    pickUnitRef.current.focus();
  }
  
  function closeUnitRef() {
    pickUnitRef.current.blur();
  }
  
const pickerRefDestination = useRef();

function openDestinationRef() {
  pickerRefDestination.current.focus();
}

function closeDestinationRef() {
  pickerRefDestination.current.blur();
}

const source = [{SOURCE:"القاهرة",id:1}, {SOURCE:"مصنع",id:2}, {SOURCE:"مشتريات",id:3}]
const postHandler =async(e)=>{
    // e.preventDefault()
    try {

    const find = await AsyncStorage.getItem("authToken")
    const details = jwtDecode(find)
    if (!details.isAdmin) return toasterExistance("only Admins can change and add new data")
console.log(details.admin)
    if (!from ||  !type || !quantity || !destination || !item || !receipt ) return toasterExistance("رجاء التأكد من ملىء جميع البيانات المطلوبة");
    await axios.post(`${process.env.REACT_APP_BASE_URL}/transactionexport`,
    {source:from,destination:destination,unit:type,quantity:quantity,date:date,items:item,receiptno:receipt,user:details.uername}).
    then(e=>{
        e.data == "error" ? toasterExistance("خطأ في تسجيل البيانات .. المهام غير متاحة بالمخزن او قد تكون اخترت وحدة غير مناسبة لقائمة الجرد..من فضلك الرجوع لقائمة الجرد من هنا ") : toasterDone("تم تسجيل البيانات بنجاح")})
      
    } catch (error) {
      toasterExistance("NetWork Problem")
    }

    
    }
    const[searcher,setSearcher]=useState(null)
    const [querySource,setQuerySource]=useState("")
    const [filteredData,setFilteredData]=useState([])
console.log(item)
 const getSpecificData =  (e)   =>{
  
  try {
  
    // setSearchData("")
      setDestination(e)
    // setFrom(e)        
const mapper = data.filter(s=>s.store === e)
setToGetSpecificITems(mapper)

setSearchQuery("")
  } catch (error) {
    console.log(error)
  }
  
    
 }


 
return(

  
  // <ScrollView horizontal={false} style={{flex: 1}}>
<View  style={{padding:30 ,backgroundColor:"#ffffff",flex:1}}>


<TextInput ref={receiptRef}  autoFocus    style={{ opacity:1 ,right:"auto",height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}
  placeholder="رقم الاذن" keyboardType="numeric"  value={receipt} onChange={e=>setReceipt(e)}/>

<TextInput  autoFocus placeholder="التاريخ"  keyboardType="default" style={{ opacity:1 ,right:"auto",height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}  
   value={date} onChange={e=>setDate(e.persist())}/>
<View style={{zindex:+6}}> 

</View>
<Picker style={{marginTop:3,opacity:1} }
  onBlur={closeRefPicker}
  

  // ref={pickerRef}
  selectedValue={from}
  onValueChange={(itemValue, itemIndex) =>
    setFrom(itemValue)
  }>
<Picker.Item label="  اختر من القائمة مصدر الوارد"  style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}} enabled={false} key={1}  />
{factories.map((e,index)=><Picker.Item label={e.name}  value={e.name} key={e._id}  /> )  }
  
</Picker>

 <Picker
 style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}
  ref={pickerRefDestination}
  selectedValue={destination}
  onValueChange={(itemValue, itemIndex) =>
  {
    // setDestination(itemValue)
    getSpecificData(itemValue)}
} 
   >
  
  
  <Picker.Item   label={"اختر من القائمة المخزن"} enabled={false} value={"اختر من القائمة المخزن"} key={""}/>
{storeNames.map((e)=><Picker.Item  label={e.name} value={e.name} key={e._id}/>)}




</Picker>


{destination?<Searchbar

onClearIconPress={()=>{setItem("")
 setType("")
 setSearchData([])}}
style={{height: 50, marginBottom:3,opacity:item ? 4 : .4,borderRadius:2,backgroundColor:"white"}}
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

<View style={{alignSelf:"center"}}>
{/* {item?<Text style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#ffffff"}}>{item}</Text>:null} */}
{type?<Text style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#ffffff"}}>{type}</Text>:null}
</View>


<TextInput placeholder="ادخل الكمية  "  style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}} keyboardType="numeric" onChangeText={e=>setQuantity(e)} value={quantity}/>
{ notExist ? <Toast 
        position='top'
        topOffset={4} 

      />:null}
    { done ? <Toast 
    
        position='top'
        topOffset={3}

      /> :null} 

<Button color="red" title="تسجيل البيانات" onPress={postHandler} /> 


    </View>
    // </ScrollView>
)    
}

