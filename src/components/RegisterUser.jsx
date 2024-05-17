import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../graphql";
import { jwtDecode } from "jwt-decode";

const RegisterUserPage = () => {
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
        console.log(data);
        localStorage.setItem("token", data.registerUser.token);
        localStorage.setItem("refreshToken", data.registerUser.refreshToken);
        const decoded = jwtDecode(data.registerUser.token);
        const userRole = decoded?.role;
        if (userRole === "mentor") {
          window.location = "/requests";
        } else if (userRole === "mentee") {
          window.location = "/mentors";
        }
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
    <div className="bg-blue-500 h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white px-4 py-6 rounded text-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
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
        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterUserPage;
