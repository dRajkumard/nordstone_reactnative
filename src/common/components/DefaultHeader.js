import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {PRIMARY_COLOR} from '../utils/Colors';
import {FEMALE_AVATAR, MALE_AVATAR} from '../utils/Images';
import {FONT_FAMILY_MEDIUM} from '../utils/Fontfamily';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {signOutapp } from '../../screens/session/auth';
export default function DefaultHeader(props) {
  const [gender, setGender] = useState('');
  const [isAvatarDropdownVisible, setAvatarDropdownVisible] = useState(false);

  useEffect(() => {
    getGender();
  }, []);

  const getGender = async () => {
    // Implement your logic to fetch user gender
    // Example: const userGender = await AsyncStorage.getItem('userGender');
    // Update the state with the user's gender
    // setGender(userGender);
  };

  const handleLogout = () => {
console.log("hel")
  };

  const toggleAvatarDropdown = () => {
    setAvatarDropdownVisible(!isAvatarDropdownVisible);
  };

  return (
    <View style={styles.container}>
      <IonIcon name="menu" size={30} color={PRIMARY_COLOR} />
      <Text style={styles.title}>{props.title}</Text>

      <MenuProvider style={styles.topsidedotbar}>
        <View>
          <Menu>
            <MenuTrigger>
              {/* <TouchableOpacity onPress={toggleAvatarDropdown}> */}
                <Image
                  source={
                    gender && gender === 'male' ? MALE_AVATAR : FEMALE_AVATAR
                  }
                  style={styles.profile}
                />
              {/* </TouchableOpacity> */}
              {/* <Text>Clickme</Text> */}
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                backgroundColor: '#FF9933',
                borderRadius:10,
                marginBottom:5,
              zIndex:1,
                // borderBottomLeftRadius: 10,
                // borderBottomRightRadius: 10,
                // borderTopLeftRadius: 10,
                // borderTopRightRadius: 10,
              }}>
              <MenuOption
                onSelect={signOutapp}
                text="Logout"
                customStyles={{
                  optionWrapper: {height: 40},
                  optionText: {
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#ffffff',
                  },
                }}
              />
            </MenuOptions>
          </Menu>
        </View>
      </MenuProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  profile: {
    width: 45,
    height: 45,
    borderRadius: 22.5, // Rounded profile image
  },
  title: {
    color: 'darkblue',
    fontSize: 22,
    fontFamily: FONT_FAMILY_MEDIUM,
  },
  
  logoutText: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    fontFamily: FONT_FAMILY_MEDIUM,
  },
  topsidedotbar: {
    flex: 1,
    marginLeft: '85%',
    // paddingTop: 20,
  },
});
