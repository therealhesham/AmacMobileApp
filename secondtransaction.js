import { Picker } from "@react-native-picker/picker";
import { useContext,useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Datacontext, contractorsContext, storeNamesContext } from "./datacontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Toast from 'react-native-toast-message'


const  Secondtransaction= () => {
const storeNames = useContext(storeNamesContext)
const contractorNames = useContext(contractorsContext)
const [from,setFrom]=useState("")
const [typeOfImporter,setTypeOfImporter]=useState("")
const [contractor,setContractor]=useState("")
const [type,setType]=useState("")
const [quantity,setQuantity]=useState("")
const [receipt,setReceipt]=useState("")
const [items,setItems]=useState("")
// const [specificitems,setToGetSpecificITems]=useState([])
const [typeOfContracting,settypeOfContracting]=useState("")
const [lOcation,setlOcation]=useState("")
const [specificitems,setToGetSpecificITems]=useState([])
const [notExist,setExistense]=useState(null)
const [specificUnite,setSpecificUnite]=useState([])
const [done,setDone]=useState(null)
const [placesData,setPlacesData]=useState([])
async function listofnames(){


  await fetch(`${process.env.REACT_APP_BASE_URL}/listofplaces`,{method:"get"}).then(e=>e.json()).then(e=> setPlacesData(e))

}

useEffect(()=>{
  listofnames()
    


})
const postHandler =async(e)=>{
   
    
    try {
        const find = await AsyncStorage.getItem("authToken")
        const details = jwtDecode(find)
        
        if (!from ||  !type || !typeOfImporter || !lOcation  ||!quantity || !items|| !receipt  ) return toasterExistance("رجاء ملىء البيانات")
        
        await axios.post(`${process.env.REACT_APP_BASE_URL}/secondtransaction`,{store:from,typeOfImporter:typeOfImporter,
            contractor:contractor,typeOfContracting:typeOfContracting,
            items:items,location:lOcation,quantity:quantity,receiptno:receipt,unit:type}).then(e=>
               e.data == "error" ? toasterExistance("خطأ في التسجيل ... المهام غير متاحة بالمخزن") : toasterDone("تم تسجيل البيانات بنجاح")
               
               
               )
               
    } catch (error) {
        console.log("error")
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
    function Clear(){
        // setDone("تم تسجيل البيانات بنجاح") 
setFrom("")
setTypeOfImporter("")
setType("")
setQuantity("")
setItems("")
settypeOfContracting("")



    }
    

    const getSpecificData = async (e)   =>{
  
        try {
        //   setDestination(e)
        setFrom(e)      
      
           await axios.post(`${process.env.REACT_APP_BASE_URL}/specificdata`,{store:e}).then((e)=>setToGetSpecificITems(e.data))
        } catch (error) {
          console.log("error")
        }
        
          
       }
       const getSpecificUnite=async(e)=>{
        setItems(e)
      
        await axios.post(`${process.env.REACT_APP_BASE_URL}/specificunit`,{items:e}).then((e)=>setSpecificUnite(e.data)).catch(e=>console.log(e))
      
      
       }
    return (  
    <SafeAreaView style={{backgroundColor:"white"}}>

<TextInput  keyboardType="numeric" value={receipt} placeholder="رقم الاذن" onChangeText={e=>setReceipt(e)}/>

<Picker
 
  
  selectedValue={from}
  onValueChange={(itemValue, itemIndex) =>
  
    getSpecificData(itemValue)
} 
   
   >
  
  

{storeNames.storeName.map((e)=><Picker.Item  label={e} value={e} key={e}/>)}




</Picker>





<Picker
placeholder="ذاتي / مقاول"


selectedValue={typeOfImporter}
onValueChange={(e)=>setTypeOfImporter(e)}
><Picker.Item  label="تنفيذ ذاتي" value="تنفيذ ذاتي" Key={1} />
<Picker.Item   label="تنفيذ مقاول" value="تنفيذ مقاول"  key={2}/>







</Picker>


{  typeOfImporter == "تنفيذ مقاول" ?
<Picker

selectedValue={contractor}
// label=؛
onValueChange={(e)=>setContractor(e)}
><Picker.Item label="اختر المقاول" disabled key="1" value="اختر المقاول" />
{contractorNames.contractor.map(e=><Picker.Item label={e.name} key={e._id} value={e.name} /> )  }


</Picker>

: null }
{typeOfImporter == "تنفيذ مقاول" ?
<Picker 

selectedValue={typeOfContracting}
label="خصم / تشغيل"
onValueChange={(e)=>settypeOfContracting(e)}
>
<Picker.Item label="تشغيل" key={1} value="تشغيل" /> 
<Picker.Item label="خصم" key={2} value="خصم" /> 





</Picker>

: null }
<Picker

selectedValue={items}
label="items"

onValueChange={(itemValue, itemIndex) =>
    getSpecificUnite(itemValue)}
>
<Picker.Item value="اختر المهام" label="اختر المهام" enabled={false}>اختر المهام</Picker.Item>
{specificitems?specificitems.map(e=><Picker.Item value={e.items}  key={e._id} label={e.items}/>):"waiting"}



</Picker>



<Picker
placeholder="الموقع"
selectedValue={lOcation}
label="الموقع"
onValueChange={(e)=>setlOcation(e)}
>
<Picker.Item value="" label="اختر الموقع" enabled={false}>اختر الموقع</Picker.Item>
{placesData? placesData.map(e=><Picker.Item value={e.name} label={e.name} >{e.name}</Picker.Item>):null}
</Picker>




<Picker
// onFocus={openUnitRef}
// onBlur={closeUnitRef}
// ref={pickUnitRef}
selectedValue={type}
onValueChange={(itemValue, itemIndex) =>
    setType(itemValue)

}  


><Picker.Item label=" اختر من القائمة الوحدة المناسبة"  enabled={true} key={1}  />

{specificUnite?<Picker.Item label={specificUnite.type} key={specificUnite._id} value={specificUnite.type}/>:""}






</Picker>
 

<TextInput  label="الكمية" 
value={quantity} onChangeText={e=>setQuantity(e)}/>


{ notExist ? <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}

      />:null}
    { done ? <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}

      /> :null} 

<Button    title="تسجيل بيانات" onPress={postHandler} >تسجيل بيانات</Button> 





    </SafeAreaView>);
}
 
export default Secondtransaction;