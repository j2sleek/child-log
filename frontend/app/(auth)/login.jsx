import React, { useState } from 'react'
import { TextInput, View, Button, Alert } from 'react-native'
import axios from 'axios'
import { useAuth } from '../../src/context/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()

  const handleSubmit = async () => {

    try {
      const res = await axios.post('http://10.135.26.254:5000/api/login', { username, password })
      const data = res.data
      if (data.token) {
        await signIn(data.token)
        console.log("Login successful. AuthNavigator will now handle the redirect automatically.")
      } else {
        Alert.alert('Login Failed', 'Invalid credientials')
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View>
      <TextInput 
        placeholder="username"
        value={username}
        onChangeText={setUsername} 
      />
      <TextInput
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  )
} 

export default Login