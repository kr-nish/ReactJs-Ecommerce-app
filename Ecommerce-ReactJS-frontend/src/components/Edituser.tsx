import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/signup.css";

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password,setPassword]= useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        const { fullName, email,password } = response.data;
        setFullName(fullName);
        setEmail(email);
        setPassword(password)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedData = { fullName, email, password };
    try {
      const response = await axios.put(`http://localhost:5000/users/${id}`, updatedData);
      if (response.status === 200) {
        navigate("/userlist"); // Redirect to the user list page after successful update
      } else {
        setError("Failed to update user, please try again.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update user, please try again.");
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      setter(event.target.value);

  return (
    <div className="signup-container">
      <h2>Edit User</h2>
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

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="signup-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
