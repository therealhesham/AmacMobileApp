import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Datacontext, contractorsContext, storeNamesContext } from "./datacontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import axios from "axios";



const  Secondtransaction= () => {
const storeNames = useContext(storeNamesContext)
const contractorNames = useContext(contractorsContext)
const [from,setFrom]=useState("")
const [typeOfImporter,setTypeOfImporter]=useState("")
const [contractor,setContractor]=useState("شسيشس")
const [type,setType]=useState("")
const [quantity,setQuantity]=useState("")
const [receipt,setReceipt]=useState("")
const [items,setItems]=useState("")
const [typeOfContracting,settypeOfContracting]=useState("")
const [lOcation,setlOcation]=useState("")
const [specificitems,setToGetSpecificITems]=useState([])
const [notExist,setExistense]=useState(null)
const [specificUnite,setSpecificUnite]=useState()
const [done,setDone]=useState(null)
// useEffect(()=>{

//     if(ex)& Clear()


// })
const postHandler =async(e)=>{
   
    
    try {
        const find = await AsyncStorage.getItem("authToken")
        const details = jwtDecode(find)
        
        if (!from ||  !type || !typeOfImporter || !lOcation  ||!quantity || !items|| !receipt  ) return setExistense("رجاء ملىء البيانات")
        
        await axios.post("https://0a02-196-133-9-14.ngrok-free.app/secondtransaction",{store:from,typeOfImporter:typeOfImporter,
            contractor:contractor,typeOfContracting:typeOfContracting,
            items:items,location:lOcation,quantity:quantity,receiptno:receipt,unit:type}).then(e=>
               e.data == "error" ? setExistense("خطأ في التسجيل ... المهام غير متاحة بالمخزن") :
                 Clear() 
                )
            
    } catch (error) {
        console.log("error")
    }
            
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
    

const getSpecificData =async (e)   =>{

    await   axios.get(`https://0a02-196-133-9-14.ngrok-free.app/specificdatas/${from}`).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
    // console.log(destination);
    
 }

    return (  
    <View>

<TextInput  keyboardType="numeric" value={receipt} placeholder="رقم الاذن" onChangeText={e=>setReceipt(e)}/>


<Picker style={{marginTop:3,opacity:1} }
//   onBlur={closeRefPicker}
//   onFocus={openRefPicker}
  placeholder="المخزن"
  onBlur={getSpecificData}
  selectedValue={from}
  
  onValueChange={(itemValue, itemIndex) =>
    setFrom(itemValue)
  }>
<Picker.Item label="" key="" value="" />
{storeNames.storeName.map(e=><Picker.Item label={e} key={e} value={e} /> )  }
  
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
>
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
label="المهام"
onValueChange={(e)=>setItems(e)}
>

{specificitems?specificitems.map(e=><Picker.Item value={e.items}  key={e._id} label={e.items}/>):"waiting"}



</Picker>



<Picker
placeholder="الموقع"
selectedValue={lOcation}
label="الموقع"
onValueChange={(e)=>setlOcation(e)}
>
<Picker.Item value="" label="اختر الموقع" enabled={false}>جبل الطير</Picker.Item>
<Picker.Item value="جبل الطير" label="جبل الطير" >جبل الطير</Picker.Item>
<Picker.Item value="ابوقرقاص" label="ابوقرقاص">ابوقرقاص</Picker.Item>
<Picker.Item value="ابشاق" label="ابشاق">ابشاق</Picker.Item>
<Picker.Item value="ابوان" label="ابوان">ابوان</Picker.Item>
<Picker.Item value="بردنوها" label="بردنوها">بردنوها</Picker.Item>
<Picker.Item value="نزلة جلف" label="نزلة جلف">نزلة جلف</Picker.Item>
<Picker.Item value="ابوجرج" label="ابوجرج">ابوجرج</Picker.Item>
<Picker.Item value="سلاقوس" label="سلاقوس">سلاقوس</Picker.Item>
<Picker.Item value="شلقام" label="شلقام">شلقام</Picker.Item>
<Picker.Item value="دمشير" label="دمشير">دمشير</Picker.Item>
<Picker.Item value="بني سعيد" label="بني سعيد">بني سعيد</Picker.Item>
<Picker.Item value="جريس" label="جريس">جريس</Picker.Item>
<Picker.Item value="كوم محرص" label="كوم محرص">كوم محرص</Picker.Item>
<Picker.Item value="السعدية" label="السعدية">السعدية</Picker.Item>
<Picker.Item value="بني خالد" label="بني خالد">بني خالد</Picker.Item>
<Picker.Item  value="طوخ الخيل" label="طوخ الخيل">طوخ الخيل</Picker.Item>
<Picker.Item  value="دشطوط" label="دشطزط">دشطوط</Picker.Item>
<Picker.Item  value="ريحانة" label="ريحانة">ريحانة</Picker.Item>
<Picker.Item  value="اطفيح" label="اطفيح">اطفيح</Picker.Item>
<Picker.Item  value="البرنسات" label="البرنسات">البرنسات</Picker.Item>
<Picker.Item  value="دمشاو هاشم"label="دمشاو هاشم">دمشاو هاشم</Picker.Item>
<Picker.Item  value="سمالوط" label="سمالوط">سمالوط</Picker.Item>

</Picker>




<Picker


value={type}
mode="dropdown"
onValueChange={(e)=>setType(e)}
>


    
<Picker.Item value="طن" label="طن" >طن</Picker.Item>
<Picker.Item value="م/ط" label="م/ط" >م/ط</Picker.Item>
<Picker.Item value="عدد" label="عدد" >عدد</Picker.Item>
<Picker.Item value="م3" label="م3" >م3</Picker.Item>



</Picker>


<TextInput  label="الكمية" 
value={quantity} onChangeText={e=>setQuantity(e)}/>
<Button    title="تسجيل بيانات" onPress={postHandler} >تسجيل بيانات</Button> 

{ notExist ? <Text  style={{color:"red"}}>
    {notExist}</Text> :null}
    { done ?    <Text style={{color:"blue"}}>{done}</Text> :null}

 



    </View>);
}
 
export default Secondtransaction;