import { useContext, useEffect, useState } from "react";
// import Autocomplete from "react-native-autocomplete-input";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { Alert, Button, ImageBackground, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AutocompleteInput from "react-native-autocomplete-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Datacontext, storeNamesContext } from "./datacontext";
import Toast from 'react-native-toast-message'

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
const [searchQuery, setSearchQuery] = useState('');
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

function receiptInputFocus() {
  return receiptRef.current.focusTextInput;
}
function receiptInputBlur() {
  receiptRef.current.blur();
}

function closeRefPicker() {
  receiptRef.current.blur();
}
const [fromList,setFromList]=useState([])
  const [data,setData]=useState([])
const [done,setDone]=useState(null)
const [alert,setAlert] = useState("")
const [receipt,setReceipt]=useState(null)
const [specificitems,setToGetSpecificITems]=useState([])

const [specificUnite,setSpecificUnite]=useState({})
const usecontext = useContext(Datacontext)
const useNameStoreContext=useContext(storeNamesContext)


const [word,setWord]=useState()
const [searchedData,setSearchData]=useState([]);
 const Search = (E)=>{
    
    
    // console.log(`${s.target.value}`.trim());
    const mapper = data.filter(e=>e.items.includes(item))

    // .includes("سلاقوس")
    
    // data.filter((e)=>e.includes("مواسير"))
    // console.log(newData);
    
        }

// const [factories,setFactories]=useState([])
        async function getDatas(){
          await axios.get(`${process.env.REACT_APP_BASE_URL}/listoffactories`,{withCredentials:true}).then((e) => 
          setFactories(e.data)
          )}
        useEffect(()=>{
getDatas()



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
    {source:from,destination:destination,unit:type,quantity:quantity,items:item,receiptno:receipt,user:details.uername}).
    then(e=>{
        e.data == "error" ? toasterExistance("خطأ في تسجيل البيانات .. المهام غير متاحة بالمخزن او قد تكون اخترت وحدة غير مناسبة لقائمة الجرد..من فضلك الرجوع لقائمة الجرد من هنا ") : toasterDone("تم تسجيل البيانات بنجاح")})
      
    } catch (error) {
      
    }
    
    }
 const getSpecificData = async (e)   =>{
  
  try {
    
    setDestination(e)
  

     await axios.post(`${process.env.REACT_APP_BASE_URL}/specificdata`,{store:e}).then((e)=>setToGetSpecificITems(e.data))
  } catch (error) {
    console.log("error")
  }
  
    
 }

 const getSpecificUnite=async(e)=>{
  
  setItem(e)

  await axios.post(`${process.env.REACT_APP_BASE_URL}/specificunit`,{items:e,store:destination}).then((e)=>setSpecificUnite(e.data)).catch(e=>console.log(e))



 }
       const [querySource,setQuerySource]=useState("")
       const [filteredData,setFilteredData]=useState([])
function filterSource(value){
  
  const date = source.filter(e=> e.SOURCE.includes(value))

setFilteredData(date)
setQuerySource(value)
}

return(
  
<View style={{padding:30 ,backgroundColor:"white",flex:1,justifyContent:"flex-start"}}>
    
<TextInput ref={receiptRef}  autoFocus   style={{ opacity:1 ,right:"auto"}}  placeholder="رقم الاذن" keyboardType="numeric" ke value={receipt} onChangeText={e=>setReceipt(e)}/>



<Picker style={{marginTop:3,opacity:1} }
  onBlur={closeRefPicker}
  

  // ref={pickerRef}
  selectedValue={from}
  onValueChange={(itemValue, itemIndex) =>
    setFrom(itemValue)
  }>
<Picker.Item label="  اختر من القائمة مصدر الوارد"  enabled={false} key={1}  />
{factories.map((e,index)=><Picker.Item label={e.name}  value={e.name} key={e._id}  /> )  }
  
</Picker>

 <Picker
 
  ref={pickerRefDestination}
  selectedValue={destination}
  onValueChange={(itemValue, itemIndex) =>
    getSpecificData(itemValue)
} 
   
   >
  
  
  <Picker.Item  label={"اختر من القائمة المخزن"} enabled={false} value={"اختر من القائمة المخزن"} key={""}/>
{useNameStoreContext.storeName.map((e)=><Picker.Item  label={e.name} value={e.name} key={e._id}/>)}




</Picker>

<Picker
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


</View>


<TextInput placeholder="ادخل الكمية  "  style={{height:100 , opacity:1}} keyboardType="numeric" onChangeText={e=>setQuantity(e)} value={quantity}/>
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


    </View>

)    
}

