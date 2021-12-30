const instialState = {
  role: "",
  token: "",
  id: "",
};

const signIn = (state = instialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, id } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);
      return { role, token, id };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      return { role: "", token: "", id: "" };

    default:
      const tokenStorge = localStorage.getItem("token");
      const roleStorge = localStorage.getItem("role");
      const idStorge = localStorage.getItem("id");
      if (tokenStorge && roleStorge)
        return { role: roleStorge, token: tokenStorge, id: idStorge };
      else return state;
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
