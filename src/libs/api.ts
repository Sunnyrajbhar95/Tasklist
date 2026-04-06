const ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/signup",
  OTP_VERIFICATION: "/auth/verify-otp",
  LOGOUT: "/auth/logout",
  GET_USER: "/user/me",
  UPDATE_USER: "/user/me",
  DELETE_USER: "/user/me",
  GET_TASKS: "/tasks",
  GET_TASK: "/tasks/:id",
  CREATE_TASK: "/tasks",
  UPDATE_TASK: "/tasks/:id",
  DELETE_TASK: "/tasks/:id",
};

export default ENDPOINTS;
