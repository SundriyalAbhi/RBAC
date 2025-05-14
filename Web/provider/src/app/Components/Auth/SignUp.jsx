import { AuthContext } from "@/app/Context/AuthContext";
import React, { useContext, useState, useEffect } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");
  const validEmail = new RegExp(/^[a-zA-Z0-9._:$!%-]+@gmail\.com$/);

  const { ProviderSignUp } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      formData?.username &&
      formData?.email &&
      formData?.password &&
      formData?.confirmpassword
    ) {
      const isPasswordValid = validPassword.test(formData.password);
      const isEmailValid = validEmail.test(formData.email);

      if (isEmailValid && isPasswordValid) {
        if (formData.password === formData.confirmpassword) {
          try {
            const res = await ProviderSignUp(formData);
            console.log("Signup Success:", res);
          } catch (error) {
            console.log("Signup Error:", error);
          }
        } else {
          console.log("Passwords do not match");
        }
      } else {
        console.log("Invalid email or password format");
      }
    } else {
      console.log("Please fill in all fields");
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmpassword: e.target.value,
            }))
          }
        />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <button>Login</button>
      </p>
    </div>
  );
}
