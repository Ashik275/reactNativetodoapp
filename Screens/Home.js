import { View, Text,FlatList,StyleSheet,TextInput,TouchableOpacity,Keyboard, Pressable} from 'react-native';
import React,{useState,useEffect} from 'react';
import {firebase} from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, deleteField } from "firebase/firestore";
import useFirebase from '../Hooks/useFirebase';
export default function Home() {
  const [todos,setTodos]=useState([]);
  const {handleLogOut,user}=useFirebase()
  const [addData,setAddData]=useState('');
  const todoRef =firebase.firestore().collection('todos');
  const navigation =useNavigation();
  
  //fetch or read the data
  useEffect(()=>{
    todoRef
    .orderBy('createdAt','desc')
    .onSnapshot(
      querySnapShot=>{
        const todos=[]
        querySnapShot.forEach((doc)=>{
          const {heading}=doc.data()
          todos.push({
            id:doc.id,
            heading
          })
        })
        setTodos(todos)
      }
    )
  },[]);

  //delete data

  const deleteTodo=(todos)=>{
    todoRef
       .doc(todos.id)
       .delete()
       .then(()=>{
         alert("Deleted Successfully");
       })
       .catch(error=>{
        alert(error);
       })
  }

  //add todo
  const addTodo=()=>{
    //check if we have a todo
    if(addData && addData.length>0){
      const timestamp=firebase.firestore.FieldValue.serverTimestamp();
      const data={
        heading:addData,
        createdAt:timestamp
      };
      todoRef
       .add(data)
       .then(()=>{
        setAddData('');
        // release keyboard 
        Keyboard.dismiss();
       })
       .catch((error)=>{
        alert(error)
       })
    }
  }


  return (
    <View style={{flex:1}}>
      <View  style={styles.headerContainer}>
      <Text style={styles.header}>Welcome {user.displayName}</Text>
      </View>
      <View style={styles.formcontainer}>
          <TextInput
              style={styles.input}
              placeholder='Add A New Todo'
              placeholderTextColor='#aaaaaa'
              onChangeText={(heading)=>setAddData(heading)}
              value={addData}
              underlineColorAndroid='transparent'
              autoCapitalize='none'
          
          />
          <TouchableOpacity style={styles.button} onPress={addTodo}>
            <Text style={styles.buttonText}>Add</Text>

          </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        numColumns={1}
        renderItem={({item})=>(
          <View>
            <Pressable
               style={styles.container}
               onPress={()=>navigation.navigate('Detail',{item})}
            >
              <FontAwesome
                name='trash-o'
                color='red'
                onPress={()=>deleteTodo(item)}
                style={styles.todoIcon}
              />
              <View  style={styles.innerContainer}>
                  <Text  style={styles.itemHeading}>
                    {item.heading[0].toUpperCase()+item.heading.slice(1)}

                  </Text>
              </View>

            </Pressable>
          </View>
        )}
      />
           <TouchableOpacity onPress={()=>{handleLogOut()}} style={styles.button}>
         <View >
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>LogOut</Text>
         </View>
      </TouchableOpacity>
    </View>
  )
}

const  styles=StyleSheet.create({
  container:{
    backgroundColor:'#e5e5e5',
    padding:15,
    borderRadius:10,
    marginHorizontal:10,
    flexDirection:'row',
    alignItems:'center'
  },
  innerContainer:{
    alignItems:'center',
    flexDirection:"column",
    marginLeft:45,
  },
  itemHeading:{
    fontWeight:'bold',
    fontSize:18,
    marginRight:22,
  },
  header:{
    fontWeight:'bold',
    fontSize:18,
    marginRight:22,
    textAlign:'center' ,
    color:'white'
  },
  headerContainer:{
    backgroundColor:'#788eec',
    padding:10
  },
  formcontainer:{
    flexDirection:"row",
    height:80,
    marginLeft:10,
    marginRight:10,
    marginTop:100,
  },
  input:{
    height:48,
    borderRadius:5,
    overflow:'hidden',
    backgroundColor:'white',
    paddingLeft:16,
    flex:1,
    marginLeft:5,
  },
  button:{
    height:47,
    borderRadius:5,
    backgroundColor:'#788eec',
    width:80,
    alignItems:'center',
    justifyContent:'center', 
  },
  buttonText:{
    color:'white',
    fontSize:20, 
  },
  todoIcon:{
    marginTop:5,
    fontSize:20,
    marginLeft:14,
  }
})