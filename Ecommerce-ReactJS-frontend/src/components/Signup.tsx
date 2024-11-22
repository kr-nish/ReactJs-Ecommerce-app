import React, { useState, ChangeEvent, FormEvent } from "react";
import "../style/signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Recommended for better alerts

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Prepare user data
    const userData = {
      fullname: fullName, // Note: changed to match backend model
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        userData
      );

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created",
        confirmButtonColor: "#28a745",
      }).then(() => {
        navigate("/login"); // Optional: redirect to login
      });
    } catch (error: any) {
      // Handle different error scenarios
      if (error.response) {
        const errorMessage = error.response.data.error || "Registration failed";

        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: errorMessage,
          confirmButtonColor: "#dc3545",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Unable to connect to server",
          confirmButtonColor: "#dc3545",
        });
      }
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      setter(event.target.value);

  return (
    <div className="signup-container">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={handleInputChange(setFullName)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="signup-button">
          Create Account
        </button>
        <br />
      </form>
    </div>
  );
};

export default Signup;
