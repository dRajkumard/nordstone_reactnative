import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncData = async ( key, value ) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem( key, jsonValue )
    }catch(error){
        console.log('AsyncSetError', error)
    }
}

export const getAsyncData = async ( key ) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          return JSON.parse(value)
        }
      } catch (e) {
        console.log('AsyncSetError', e)
      }
}