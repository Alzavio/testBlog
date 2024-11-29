import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Fetching from "./components/fetching";

export default function App() {
  const queryClient = new QueryClient()
  return (
      <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <Fetching />
          </QueryClientProvider>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
