import { useContext, useEffect, useState } from "react";


import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { Alert, Button, ImageBackground, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AutocompleteInput from "react-native-autocomplete-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Datacontext, storeNamesContext } from "./datacontext";


export default function FirstTransaction(props){

const ref = useRef(0)
    const [transactionType,setTransactionType]=useState("")
const[from,setFrom]=useState("")
const refFocus =useRef()
const[to,setTo]=useState("")
const[type,setType]=useState("")
const [unit,setUnit]=useState([])
const [quantity,setQuantity]=useState(0)
const [destination ,setDestination ] =useState("")
const [item,setItem]=useState("")
const [notExist,setExistense]=useState("")
const [store,setStore]=useState(destination)
const pickerRef = useRef();

function openRefPicker() {
  pickerRef.current.focus();
}

function closeRefPicker() {
  pickerRef.current.blur();
}
const [fromList,setFromList]=useState([])
  const [data,setData]=useState([])
const [done,setDone]=useState("")
const [alert,setAlert] = useState("")
const [receipt,setReceipt]=useState()
const [specificitems,setToGetSpecificITems]=useState([])
const [specificUnite,setSpecificUnite]=useState()
const usecontext = useContext(Datacontext)
const useNameStoreContext=useContext(storeNamesContext)



console.log(usecontext)
const Clear =()=>{
    setDone("تم تسجيل البيانات بنجاح") 
setFrom("")
setTo("")
setExistense("")
setType("")
setQuantity("")
setItem("")
}
const [word,setWord]=useState()
const [searchedData,setSearchData]=useState([]);
 const Search = (E)=>{
    
    
    // console.log(`${s.target.value}`.trim());
    const mapper = data.filter(e=>e.items.includes(item))
console.log(mapper)
    // .includes("سلاقوس")
    
    // data.filter((e)=>e.includes("مواسير"))
    // console.log(newData);
    
        }


useEffect( ()=>{
if (ref.current  == 0) 
{  

fetch("https://0a02-196-133-9-14.ngrok-free.app/preview",{method:"get"}).then(e=>e.json()).then(e=>setData(e))
// console.log(ref.current  == 0)
const arr=[];
const unitArr = []

//    data.forEach(e=> {if (!arr.includes(e.store)) return  setFromList([...fromList,e.store])}) 
    
// setFromList(arr)
//    data.forEach(e=> {if (!unitArr.includes(e.type)) return unitArr.push(e.type)})
//    fromList.length == 0 ?console.log(fromList):""
}
else {console.log(ref.current  == 0)}
},[])






// console.log(fromList)
console.log(ref.current)
console.log(fromList)

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

const source = ["القاهرة", "اسماء مصانع", "مشتريات"]
const postHandler =async(e)=>{
    // e.preventDefault()
    const find = await AsyncStorage.getItem("authToken")
    const details = jwtDecode(find)
    
    if (!from ||  !type || !quantity || !destination || !item || !receipt ) return setExistense("رجاء ملىء البيانات")
    await axios.post("https://0a02-196-133-9-14.ngrok-free.app/transactionexport",
    {source:from,destination:destination,unit:type,quantity:quantity,items:item,receiptno:receipt,user:details.uername}).
    then(e=>{
        e.data == "error" ? setExistense("خطأ في تسجيل البيانات .. المهام غير متاحة بالمخزن او قد تكون اخترت وحدة غير مناسبة لقائمة الجرد..من فضلك الرجوع لقائمة الجرد من هنا ") : Clear()})
    
    }
 const getSpecificData =(e)   =>{
    

    axios.post("https://0a02-196-133-9-14.ngrok-free.app/specificdata",{store:destination}).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
    
 }
        
return(

<View style={{paddingTop:60 ,backgroundColor:"#FFFAE3",flex:1,justifyContent:"flex-start"}}>


    
<TextInput style={{ color:"black",opacity:1}}  placeholder="رقم الاذن" value={receipt} onChangeText={e=>setReceipt(e)}/>



<Picker style={{marginTop:3,opacity:1} }
//   onBlur={closeRefPicker}
//   onFocus={openRefPicker}

  ref={pickerRef}
  selectedValue={from}
  onValueChange={(itemValue, itemIndex) =>
    setFrom(itemValue)
  }>

{source.map(e=><Picker.Item label={e} value={e} /> )  }
  
</Picker>

 <Picker
 onBlur={closeDestinationRef}
  ref={pickerRefDestination}
  selectedValue={destination}
  onValueChange={(itemValue, itemIndex) =>
    setDestination(itemValue)
  } 
   
   >
  
  

{usecontext.data.map((e)=><Picker.Item  label={e.items} value={e.items} />)}




</Picker>

<Picker
// onFocus={openUnitRef}


onBlur={closeUnitRef}
ref={pickUnitRef}
selectedValue={item}
onValueChange={(itemValue, itemIndex) =>
    setItem(itemValue)
}  >

{useNameStoreContext.storeName.map(e=><Picker.Item label={e} key={e} value={e}/>)}


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


>



<Picker.Item label="م/ط" key={1} value="م/ط"/>
<Picker.Item label="عدد" key={2} value="عدد"/>

<Picker.Item label="طن" value="طن"  key={3}/>




</Picker>


</View>


<TextInput placeholder="ادخل الكمية  " style={{height:100 , opacity:1}} keyboardType="numeric" onValueChange={e=>setQuantity(e)} value={quantity}/>
{ notExist ? <Text  style={{color:"red"}}>{notExist}</Text>
    :null}
    { done ?  <Text>تم ادخال البيانات بنجاح</Text>  :null} 

<Button color="purple" title="تسجيل البيانات" onPress={postHandler} >تسجيل بيانات</Button> 

{/* <button style={{backgroundColor:"blue",color:"white"}} onClick={postHandler}>تسجيل بيانات</button> */}


    </View>

)    
}

