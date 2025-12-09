import { useState, useContext } from 'react'
import { View, TextInput, Button } from 'react-native'
import axios from 'axios'
import { AuthContext } from './context/AuthContext'
import { useRouter } from 'expo-router'
import styles from '@/styles'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/login', {
        username,
        password,
      })
      await login(res.data)
      router.replace('/(tabs)')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}