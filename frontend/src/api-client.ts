import { RegisterFormData } from "./Pages/Register";
import { SignInFormData } from "./Pages/SignIn";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const resBody = await res.json();
  if (!res.ok) {
    throw new Error(resBody.message);
  }
};
export const signIn = async (formData: SignInFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Token Invalid");
  }
  return res.json();
};

export const signOut=async()=>{
  const res=await fetch(`${API_BASE_URL}/api/auth/logout`,{
    credentials:"include",
    method:"POST"
  })
  if(!res.ok){
    throw new Error("Error during SignOut")
  }
}
