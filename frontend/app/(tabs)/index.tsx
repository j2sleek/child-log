import { Text, View } from 'react-native';
import { Link } from 'expo-router'
import styles from '@/styles';

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>
        Home Screen.
      </Text>
      <Link href="/profile" style={styles.button}>
        Go To Profile Screen
      </Link>
    </View>
  );
}