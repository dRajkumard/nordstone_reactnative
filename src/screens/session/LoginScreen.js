import {
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {LOGO_WHITE} from '../../common/utils/Images';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../../common/utils/Colors';
import {OTP_VERIFICATION_SCREEN} from '../../common/utils/NavigationRoot';
import {
  FONT_FAMILY,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_MEDIUM,
} from '../../common/utils/Fontfamily';
import {fetchApi, getApi} from '../../common/utils/Api';
import {API_URL} from '../../common/utils/Constants';
import {AlertMessage} from '../../common/components/AlertMessage';
import {useDispatch} from 'react-redux';
import { loginUser } from './slice';
import {Auth, signIn} from './auth';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const login = async () => {
    if (email) {
      if (password) {
        
       Auth.signIn(email,password)
      } else {
        AlertMessage('Warning', 'Enter Mobile Number');
      }
    } else {
      AlertMessage('Warning', 'Enter email');
    }
  };

  // const login = () => {
  //   dispatch(loginUser(email, password));
  // };

  return (
    <LinearGradient
      colors={['#AEEEEE', '#0000CD']}
      style={styles.linearGradient}>
      <StatusBar barStyle="light-content" backgroundColor={SECONDARY_COLOR} />
      <Image source={LOGO_WHITE} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome</Text>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={name => setEmail(name)}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={number => setPassword(number)}
        style={styles.textinput}
      />
      {/* <TouchableOpacity style={styles.button} onPress={() => getOTP()}>
        <Text style={styles.buttonText}>Get OTP</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={() => signIn(email,password,navigation)}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('signup')}>
        <Text style={styles.buttonText}>create account</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // logo: {
  //   width: 230,
  //   height: 230,
  // },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    marginBottom: '8%',
    marginTop: '5%',
    fontFamily: FONT_FAMILY_BOLD,
    letterSpacing: 1,
  },
  textinput: {
    width: '75%',
    marginTop: '5%',
    paddingLeft: 30,
    backgroundColor: 'white',
    borderRadius: 25,
    fontSize: 15,
    fontFamily: FONT_FAMILY,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: '7%',
    paddingVertical: 5,
    marginVertical: '10%',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    color: PRIMARY_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONT_FAMILY_MEDIUM,
  },
});
