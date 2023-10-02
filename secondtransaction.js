import { Picker } from "@react-native-picker/picker";
import { useContext,useEffect, useState } from "react";
import { Button, FlatList, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Datacontext, contractorsContext, storeNamesContext } from "./datacontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import {  Searchbar } from 'react-native-paper'
import axios from "axios";
import Toast from 'react-native-toast-message'

import ListComponen from "./firsttransactionmemo";
import { ScrollView } from "react-native";

const  Secondtransaction= () => {
// const storeNames = useContext(storeNamesContext)

const [from,setFrom]=useState("")
const [date,setDate]=useState("")
const [typeOfImporter,setTypeOfImporter]=useState("")
const [searchedData,setSearchData]=useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [contractor,setContractor]=useState("")
const [type,setType]=useState("")
const [data,setData]=useState([])
const [quantity,setQuantity]=useState("")
const [receipt,setReceipt]=useState("")
const [items,setItems]=useState("")
// const [specificitems,setToGetSpecificITems]=useState([])
const [typeOfContracting,settypeOfContracting]=useState("")
const [lOcation,setlOcation]=useState("")
const [specificitems,setToGetSpecificITems]=useState([])
const [notExist,setExistense]=useState(null)
const [specificUnite,setSpecificUnite]=useState({})
const [done,setDone]=useState(null)
const [placesData,setPlacesData]=useState([])
const [storeNames,setStoreNames]=useState([])
const [contractorNames,setContractorNames]=useState([])


const fetchStores = async()=>{

  await fetch(`https://reactnativebackend.onrender.com/listofnames`,{method:"get"}).then(e=>e.json()).then(e=> setContractorNames(e))
 await fetch(`https://reactnativebackend.onrender.com/listofplaces`,{method:"get"}).then(e=>e.json()).then(e=> setPlacesData(e));
 await fetch(`https://reactnativebackend.onrender.com/preview`,{method:"get"}).then(e=>e.json()).then(e=> setData(e));
 await fetch(`https://reactnativebackend.onrender.com/listofstores`,{method:"get"}).then(e=>e.json()).then(e=> setStoreNames(e))

}  
useEffect(()=>{
  fetchStores()
  
  
},[])
const postHandler =async(e)=>{
   
    
    try {
        const find = await AsyncStorage.getItem("authToken")
        const details = jwtDecode(find)
        if (!details.isAdmin) return toasterExistance("only Admins can change and add new data")  
        if (!from ||  !type || !typeOfImporter || !lOcation ||date  ||!quantity || !items|| !receipt  ) return toasterExistance("رجاء ملىء البيانات")
        
        await axios.post(`https://reactnativebackend.onrender.com/secondtransaction`,{store:from,typeOfImporter:typeOfImporter,
            contractor:contractor,typeOfContracting:typeOfContracting,
            items:items,location:lOcation,date:date,quantity:quantity,receiptno:receipt,unit:type}).then(e=>
               e.data == "error" ? toasterExistance("خطأ في التسجيل ... المهام غير متاحة بالمخزن") : toasterDone("تم تسجيل البيانات بنجاح")
               
               
               )
               
    } catch (error) {
        toasterExistance("Network Problem")
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
          setSearchData("")
            //   setDestination(e)
            setFrom(e)        
const mapper = data.filter(s=>s.store === e)
setToGetSpecificITems(mapper)

  setSearchQuery("")

        } catch (error) {
          console.log("error")
        }
        
          
       }
       const uniteGetter=(n,s)=>{
        try {
                  
          setItems(s)
          const mapper= specificitems.filter(e=>e._id == n );
          setType(mapper[0].type)
          setSearchQuery(mapper[0].items)
          setSearchData([])
          toasterExistance(` ${mapper[0].store}  يتضمن ${mapper[0].quantity} ${mapper[0].type} من المهام المحددة`)      
        } catch(error) {
          toasterExistance("المهام غير موجودة")
        }
        }
        
       const Search = (E)=>{
    
    setSearchQuery(E)
    
        const mapper = specificitems.filter(e=>e.items.includes(E))
    
        setSearchData(mapper)
            }
    
    
    return ( 
      // <ScrollView horizontal={false} style={{flex: 1}}> 
    <View style={{backgroundColor:"#ffffff",padding:30}}>

<TextInput  keyboardType="numeric" value={receipt} placeholder="رقم الاذن" style={{backgroundColor:"#fff8f5",height:60,borderRadius:10}} onChangeText={e=>setReceipt(e)}/>

<TextInput  autoFocus placeholder="التاريخ"  keyboardType="default" style={{ opacity:1 ,right:"auto",height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}  
   value={date} onChange={e=>setDate(e.persist())}/>
<Picker
 
  
  selectedValue={from}
  onValueChange={(itemValue, itemIndex) =>
  
    getSpecificData(itemValue)
} 
   
   >
  
  
  <Picker.Item  label="اختر المخزن من القائمة" value="اختر المخزن" enabled={false} key={1}/>
{storeNames.map((e)=><Picker.Item  label={e.name} value={e.name} key={e._id}/>)}




</Picker>
{from?<Searchbar

onClearIconPress={()=>
  {setType("")
  setItems("")
  setSearchData([])}}
style={{height: 50, marginBottom:3,opacity:.4,borderRadius:2,backgroundColor:"white"}}
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
  
   style={{ backgroundColor:"white",zIndex:10,elevation:50}} 
keyExtractor={(e,index)=>e._id}
data={searchedData.length > 0 ?searchedData:[]}
renderItem={e=> <ListComponen uniteGetter={(e,d)=>uniteGetter(e,d)} setSpecificItem={setToGetSpecificITems} id={e.item._id}  key={e.item._id} item={e.item.items}/> }/>

 </View>



 <View style={{width:300,alignSelf:"center"}}>
{items?<Text style={{height:50, opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}>{items}</Text>:null}
{type?<Text style={{height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}>{type}</Text>:null}
</View>




<Picker
placeholder="ذاتي / مقاول"


selectedValue={typeOfImporter}
onValueChange={(e)=>setTypeOfImporter(e)}
>
<Picker.Item  label="نوع التنفيذ" enabled={false} value="" Key={3} />
  <Picker.Item  label="تنفيذ ذاتي" value="تنفيذ ذاتي" Key={1} />
<Picker.Item   label="تنفيذ مقاول" value="تنفيذ مقاول"  key={2}/>







</Picker>


{  typeOfImporter == "تنفيذ مقاول" ?
<Picker
// style={{color:"red"}}
selectedValue={contractor}
// label=؛
onValueChange={(e)=>setContractor(e)}
><Picker.Item label="اختر المقاول"  enabled={false} key={1} value="اختر المقاول" />
{contractorNames.map(e=><Picker.Item label={e.name}  key={e._id} value={e.name} /> )  }


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
placeholder="الموقع"
selectedValue={lOcation}
label="الموقع"
onValueChange={(e)=>setlOcation(e)}
>
<Picker.Item value="" label="اختر الموقع" enabled={false}>اختر الموقع</Picker.Item>
{placesData? placesData.map(e=><Picker.Item key={e._id} value={e.name} label={e.name} >{e.name}</Picker.Item>):null}
</Picker>



 

<TextInput  label="الكمية" placeholder="الكمية"
value={quantity} onChangeText={e=>setQuantity(e)} style={{ opacity:1 ,right:"auto",height:50 , opacity:1,borderRadius:6,backgroundColor:"#fff8f5"}}  />


{ notExist ? <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}

      />:null}
    { done ? <Toast onPress={()=>Toast.hide()}
        position='top'
        topOffset={3}

      /> :null} 

<Button    title="تسجيل بيانات" onPress={postHandler} >تسجيل بيانات</Button> 


</View>


    // </ScrollView>
    );
}
 
export default Secondtransaction;