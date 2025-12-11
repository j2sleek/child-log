import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Home Screen.
      </Text>
      <Link
        href="/record"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-base font-medium"
      >
        Go To Record Screen
      </Link>
    </View>
  );
}