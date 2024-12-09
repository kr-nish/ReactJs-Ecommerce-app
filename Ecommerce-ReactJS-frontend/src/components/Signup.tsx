import React, { useState, ChangeEvent, FormEvent } from "react";
import "../style/signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthService } from "./Login"; // We'll use this for potential auto-login after signup

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  // Password strength validation
  const validatePassword = (password: string): boolean => {
    // More comprehensive password validation:
    // - At least 8 characters long
    // - Contains at least one uppercase letter
    // - Contains at least one lowercase letter
    // - Contains at least one number
    // - Contains at least one special character
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Reset previous errors
    setError("");

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

    // Validate password strength
    if (!validatePassword(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Prepare user data
    const userData = {
      fullname: fullName,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        userData
      );

      // Check if backend returns a token (auto-login scenario)
      if (response.data.token) {
        // Use AuthService to handle token storage
        AuthService.login(response.data.token);
      }

      // Success alert
      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created",
        confirmButtonColor: "#28a745",
        timer: 2000
      });

      // Redirect to login or directly to product management
      navigate("/productmanagement");

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

        // Set error state for additional context
        setError(errorMessage);
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
            minLength={2}
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
            minLength={8}
          />
          <small>At least 8 characters, include uppercase, lowercase, and number</small>
        </div>
        
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword)}
            required
            minLength={8}
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="signup-button">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;