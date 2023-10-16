import { createSlice } from '@reduxjs/toolkit'
import { fetchApi } from '../../common/utils/Api'
import { API_URL } from '../../common/utils/Constants'
import { getAsyncData } from '../../common/utils/Functions'

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    userdetails: {}
}

export const sessionReducer = createSlice({
    name: 'session',
    initialState,
    reducers: {
      setLogin: (state, action) => {
        state.isLoggedIn = action.payload
      },
      setUserDetails: (state, action) => {
        state.userdetails = action.payload
      }
    },
})

export const loginUser = () => async(dispatch) => {
  const username = await getAsyncData('username');
  const mobileNumber = await getAsyncData('mobileNumber');
  // const reqdata = {
  //   "action":"getData",
  //   "user_name": username, 
  //   "mobile_no": mobileNumber
  // }
  // const response = await fetchApi(API_URL+'login_api.php', reqdata);
  // if(response.result == "success"){
    dispatch(setLogin(true))
    dispatch(setUserDetails(response.data))
  // }else{
  //   console.log(response)
  // }
}

export const { setLogin, setUserDetails } = sessionReducer.actions

export default sessionReducer.reducer