import { Slot, useRouter, useSegments, useRootNavigationState } from 'expo-router'
import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '@/styles';

function AuthNavigator() {
  const { userToken, isLoading } = useAuth()
  const segments = useSegments()
  const router = useRouter()
  const rootNavigationState = useRootNavigationState()

  useEffect(() => {
    if (isLoading || !rootNavigationState?.key) return

    const inAuthGroup = segments[0] === '(auth)'

    if (userToken && inAuthGroup) {
      console.log('Root Nav: User logged in, redirecting to /')
      router.replace('/')
    } else if (!userToken && !inAuthGroup) {
      console.log('Root Nav: User logged out, redirecting to /(auth)/login')
      router.replace('/(auth)/login')
    }
  }, [userToken, isLoading, segments, router, rootNavigationState?.key])

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return <Slot />
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthNavigator />
    </AuthProvider>
    );
}
