import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'

export default function TabLayout() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user?.token) {
      router.replace('/login')
    }
  }, [loading, user])

  if (loading) {
    return null
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e'
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e'
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused 
                ? 'home-sharp'
                : 'home-outline'
              }
              color={color}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: 'Record',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused
                ? 'documents-sharp'
                : 'documents-outline'
              }
              color={color}
              size={24}
            />
          )
        }}
      />
    </Tabs>
  )
}