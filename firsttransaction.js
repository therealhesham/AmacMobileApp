import { memo, useContext, useEffect, useMemo, useState } from "react";
import DatePicker from "expo-datepicker";
// import Autocomplete from "react-native-autocomplete-input";
import axios from "axios";
import ListComponen from './firsttransactionmemo';
import DateTimePicker ,{DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { Alert, Button, KeyboardAvoidingView,ImageBackground,Text, TextInput, View,FlatList, Pressable, TouchableOpacity } from "react-native";
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
setExistense("")
setType("")
setQuantity("")
setItem("")
}



const ref = useRef(0)
const [transactionType,setTransactionType]=useState("")
const[from,setFrom]=useState("")
const refFocus =useRef()
const [searchQuery, setSearchQuery] = useState([]);
const[to,setTo]=useState("")
const[type,setType]=useState("")
const [unit,setUnit]=useState([])
const [quantity,setQuantity]=useState(0)
const [destination ,setDestination ] =useState("")
const [item,setItem]=useState("")
const [notExist,setExistense]=useState(null)
const [store,setStore]=useState(destination)
const [factories,setFactories]=useState([])
const receiptRef = useRef();
const [fromList,setFromList]=useState([])
const [storeNames,setStoreNames]=useState([])
const [data,setData]=useState([])
const [done,setDone]=useState(null)
const [alert,setAlert] = useState("")
const [receipt,setReceipt]=useState(null)
const [specificitems,setToGetSpecificITems]=useState([])
const [timestamp ,settimeStamp]=useState(1616608200000)
// const [date, setDate] = useState(new Date().toString());
const [date, setDate] = useState(new Date());
const [specificUnite,setSpecificUnite]=useState({})
const usecontext = useContext(Datacontext)
const useNameStoreContext=useContext(storeNamesContext)


const [word,setWord]=useState()
const [searchedData,setSearchData]=useState([]);


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

console.log(date)


const pickUnitRef= useRef();

function openUnitRef() {
    pickUnitRef.current.focus();
  }
  
  function closeUnitRef() {
    pickUnitRef.current.blur();
  }
  const uniteGetter=(n,s)=>{
    try {
      setItem(s)
      const mapper= specificitems.filter(e=>e._id == n );
      setType(mapper[0].type)
       
    } catch (error) {
      toasterExistance(` المهام غير موجودة في ${destination}`)
    }
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

 const getSpecificData =  (e)   =>{
  
  try {
  
const mapper = data.filter(s=>s.store === e)
setToGetSpecificITems(mapper)
setDestination(e)
  } catch (error) {
    console.log(error)
  }
  
    
 }


return(
  // const [searchQuery, setSearchQuery] = useState('');
< KeyboardAvoidingView behavior="position"  style={{padding:30 ,backgroundColor:"#ffffff",flex:1,justifyContent:"flex-start"}}>


<TextInput ref={receiptRef}  autoFocus    style={{ opacity:1 ,right:"auto",height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}
  placeholder="رقم الاذن" keyboardType="numeric"  value={receipt} onChange={e=>setReceipt(e)}/>

<TextInput  autoFocus placeholder="التاريخ"  keyboardType="default" style={{ opacity:1 ,right:"auto",height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}  
   value={date} onChange={e=>setDate(e.persist())}/>
<View style={{zindex:+6}}> 
{/* <DatePicker
// containerStyle={{zIndex:20}}/
inputStyle={{alignItems:"center",zIndex:1}}
        date={date}
        onChange={(date) => setDate(date)}
        
      /> */}
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
    getSpecificData(itemValue)
} 
   >
  
  
  <Picker.Item   label={"اختر من القائمة المخزن"} enabled={false} value={"اختر من القائمة المخزن"} key={""}/>
{storeNames.map((e)=><Picker.Item  label={e.name} value={e.name} key={e._id}/>)}




</Picker>
<View style={{alignSelf:"center"}}>
{item?<Text style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#ffffff"}}>{item}</Text>:null}
{type?<Text style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#ffffff"}}>{type}</Text>:null}
</View>
{/* <Picker
// onFocus={openUnitRef}


// onBlur={closeUnitRef}
ref={pickUnitRef}
selectedValue={item}
onValueChange={(itemValue, itemIndex) =>
  
  getSpecificUnite(itemValue)
}  >
<Picker.Item label=" اختر من القائمة المهام المطلوبة"  enabled={false} key={1}  />
{specificitems.map(e=><Picker.Item label={e.items} key={e._id} value={e.items}/>)}


</Picker>

<View>
<Picker
// onFocus={openUnitRef}
// onBlur={closeUnitRef}
// ref={pickUnitRef}
selectedValue={type}
onValueChange={(itemValue, itemIndex) =>
    
    setType(itemValue)

}  


><Picker.Item label=" اختر من القائمة الوحدة المناسبة"  enabled={false} key={1}  />

{specificUnite ?<Picker.Item label={specificUnite.type} key={specificUnite._id} value={specificUnite.type}/>:<Text></Text>}






</Picker>
 */}

{/* </View> */}


<TextInput placeholder="ادخل الكمية  "  style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}} keyboardType="numeric" onChangeText={e=>setQuantity(e)} value={quantity}/>
{ notExist ? <Toast 
        position='top'
        topOffset={3} onHide={()=> clearProps()}

      />:null}
    { done ? <Toast 
        position='top'
        topOffset={3}

      /> :null} 

<Button color="red" title="تسجيل البيانات" onPress={postHandler} /> 

{/* <button style={{backgroundColor:"blue",color:"white"}} onClick={postHandler}>تسجيل بيانات</button> */}

  {specificitems.length >0?
    <KeyboardAvoidingView behavior="height">



<Searchbar
style={{height:50, marginBottom:3,opacity:.9}}
      placeholder="بحث"
      onChangeText={(query)=>Search(query)}
      // value={searchQuery}
    />


<View  >
  <FlatList
          
  
  initialNumToRender={2}
  
   style={{height:200 }} 
keyExtractor={(e,index)=>e._id}
data={searchedData.length > 0 ?searchedData:specificitems}
renderItem={e=> <ListComponen uniteGetter={(e,d)=>uniteGetter(e,d)} id={e.item._id}  item={e.item.items}/> }/>

 </View>
    </ KeyboardAvoidingView>:""}
    </KeyboardAvoidingView>
)    
}

