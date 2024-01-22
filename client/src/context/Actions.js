export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload: user
})

export const LoginFail = ()=>({
    type: "LOGIN_FAIL"
})

export const LogOut = () => ({
  type: "LOGOUT",
});

// for upload user profile image in database....

export const UpdateStart = (userCredentials) => ({
  type: "UPDATE_START",
});

export const UpdateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const UpdateFail = () => ({
  type: "UPDATE_FAIL",
});