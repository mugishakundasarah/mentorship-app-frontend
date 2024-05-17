import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../graphql";
import { useNavigate } from "react-router-dom";

const RegisterUserPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    bio: "",
    occupation: "",
    expertise: "",
  });

  const [registerUser, { loading, error }] = useMutation(
    REGISTER_USER_MUTATION,
    {
      onCompleted: (data) => {
        localStorage.setItem("token", data.registerUser.token);
        localStorage.setItem("refreshToken", data.registerUser.refreshToken);
        navigate("/mentors");
      },
    }
  );
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({
        variables: {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          bio: formData.bio,
          role: "mentee",
          occupation: formData.occupation,
          expertise: formData.expertise,
        },
      });
      console.log("User registered:", data);
      // Redirect to another page, show a success message, etc.
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <input
          type="text"
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <input
          type="text"
          name="expertise"
          placeholder="Expertise"
          value={formData.expertise}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white rounded-md px-4 py-2 w-full"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default RegisterUserPage;
