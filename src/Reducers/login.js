const instialState = {
    role: "",
    token: "",
  };

  const signIn = (state = instialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "LOGIN":
        const { role, token } = payload;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        return { role, token };
  
      case "LOGOUT":
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return {role: "", token:""};
  
      default:
          const tokenStorge=localStorage.getItem("token")
          const roleStorge=localStorage.getItem("role")
          if(tokenStorge&&roleStorge)
            return{role:roleStorge,token:tokenStorge}
       else  return state;
    }
  };
  
  export default signIn;

  export const login1 = (data) => {
    return {
      type: "LOGIN",
      payload: data,
    };
  };

  export const logout1 = (data) => {
    return {
      type: "LOGOUT",
      payload: data, 
    };
  };