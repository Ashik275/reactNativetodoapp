import { useNavigation } from "@react-navigation/native";
import { getAuth,signOut, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,updateProfile} from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import initializeAuthentication from "../Firebase/firebaseinit";




initializeAuthentication();


const useFirebase=()=>{
  const auth = getAuth();
  const navigation=useNavigation();
  const [user,setUser]=useState({})
  const handleRegistration=(email,password,confirmPassword,name)=>{
    if(password===confirmPassword){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user)
      
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
          Alert.alert("Your Account Was Created"+name)
        })
      })
    }
    else{
      Alert.alert("Your Password Didn't Matched")
    }
  }
  const handleLogin=(email,password)=>{
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setUser(user)
    navigation.navigate('Home')
  })
  }
  const handleLogOut=()=>{
signOut(auth).then(() => {
  navigation.navigate('Login')
})
  }

  // set user 
  
  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
        if(user){
           setUser(user)
        }
        else{
           setUser({})
        }
    })
},[])



return{
    handleRegistration,
    handleLogin,
    handleLogOut,
    user
}
}
export default useFirebase;

