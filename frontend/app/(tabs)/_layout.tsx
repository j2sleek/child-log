import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useAuth } from '@/src/context/AuthContext';
import { Button } from 'react-native';

export default function TabsLayout() {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    console.log('Logout successful. AuthNavigator will redirect now.')
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
        headerRight: () => (
          <Button 
            onPress={handleLogout} 
            title='Log Out'
            color='red'
          />
        )
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <Ionicons 
              name={focused 
                ? 'home-sharp' 
                : 'home-outline'
              }
              color={color}
              size={24}
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="record" 
        options={{ 
          title: 'Record',
          tabBarIcon: ({color, focused}) => (
            <Ionicons 
              name={focused 
                ? 'home-sharp' 
                : 'home-outline'
              }
              color={color}
              size={24}
            />
          ),
        }} 
      />
    </Tabs>
  );
}