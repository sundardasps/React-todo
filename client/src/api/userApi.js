import { userInterseption } from "../utils/interseptor";

const userApi = userInterseption;

export async function login(values) {
  try {
    const result = await userApi.post("/login", values);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function signup(values) {
  try {
    const result = await userApi.post("/signup", values);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function googleSignUp(values) {
  try {
    const result = await userApi.post("/googleSignUp", values);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function otpVerification(otp, email) {
  try {
    const result = await userApi.get(`/otpVarify/${otp}/${email}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function resendOtp(email) {
  try {
    const result = await userApi.get(`/resendOtp/${email}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function createTodo(values) {
  try {
    const result = await userApi.post("/createTodo", values);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getTodoList(filter) {
  try {
    const result = await userApi.get("/todoList",{params:{filter}});
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getTotoDetails(id) {
  try {
    const result = await userApi.get(`/getTodo/${id}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function deleteTodo(id) {
   try {
     const result = await userApi.get(`/deleteTodo/${id}`);
     return result;
   } catch (error) {
     console.log(error.message);
   }
 }

 export async function editTodo(values) {
  try {
    const result = await userApi.put("/editTodo",values);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addCompleted(id) {
  try {
    const result = await userApi.get(`/addComplete/${id}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}
