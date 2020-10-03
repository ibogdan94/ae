import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_PREFIX} from './configuration';

export async function saveAccessToken(token: string): Promise<void> {
  await AsyncStorage.setItem(`${STORAGE_PREFIX}:token`, token);
}

export async function getAccessToken(): Promise<string | null> {
  return await AsyncStorage.getItem(`${STORAGE_PREFIX}:token`);
}

export async function removeAccessToken(): Promise<void> {
  await AsyncStorage.removeItem(`${STORAGE_PREFIX}:token`);
}
