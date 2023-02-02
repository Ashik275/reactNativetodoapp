import { View, Text,TextInput, StyleSheet,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import useFirebase from '../Hooks/useFirebase';
export default function LoginScreen() {
    const {handleLogin}=useFirebase();
    const navigation =useNavigation();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
  return (
    <View style={styles.container}>
        <View  style={styles.loginHeaderComponent}>
        <Text style={styles.loginHeader}>User Login</Text>
        </View>
        <TextInput
        style={styles.input}
        placeholder="Your Email "
        onChangeText={(text)=>setEmail(text)}
      />
        <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text)=>setPassword(text)}
      />
        <TouchableOpacity onPress={()=>{handleLogin(email,password)}}>
         <View style={styles.button}>
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Login</Text>
         </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('Registration')}}>
        <Text>Didn't Have an Account? Please Register</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      color:'red',
      width:300,
      margin: 12,
      padding: 10,
      borderBottomColor:'black',
      borderBottomWidth:1,
      placeholderTextColor:'red'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      loginHeaderComponent:{
         width:300,
         height:50,
         backgroundColor:'skyblue',
         alignItems:'center',
         justifyContent:'center'
      },
      loginHeader:{
        fontWeight:'bold',
        color:'white',
        fontSize:20
      },
      button:{
        marginTop:10,
        backgroundColor:'skyblue',
        padding:10,
        borderRadius:5,
        alignItems:"center",
        width:300,
    
      }
  });