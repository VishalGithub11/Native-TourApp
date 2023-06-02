import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeString = async (key, value) => {
    try {
      await AsyncStorage.setItem(`@${key}`, value)
    } catch (e) {
        console.log("error in saving", e);
      // saving error
    }
  }


  export const storeObject = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
  
      await AsyncStorage.setItem(`@${key}`, jsonValue)
    } catch (e) {
      // saving error
      console.log("error in saving", e);
    }
  }

  
  export const getString = async (key) => {
    try {
      const value = await AsyncStorage.getItem(`@${key}`)
      if(value !== null) {
        // value previously stored
        return value
      }
    } catch(e) {
      // error reading value
      console.log("error in getting", e);
    }
  }

  export const getObjectdata = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`)
      return jsonValue != null ? JSON.parse(jsonValue): null;
    } catch(e) {
      // error reading value
      console.log("error in getting", e);
    }
  }


  export const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@favorite')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }
  