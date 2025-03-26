import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const SectionLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      setError("Please fill out all fields.");
      return;
    }

    // Credentials to match
    const validCredentials = [
      {
        email: "ankitvashist765@gmail.com",
        password: "iamankit@05",
      },
    ];

    const user = validCredentials.find(
      (cred) => cred.email === loginEmail && cred.password === loginPassword
    );

    if (user) {
      // Redirect to the franchisecategory page if credentials are valid
      alert("Logged in successfully!");
      setError("");
      navigate("/franchise");
    } else {
      // Show error message if credentials are incorrect
      setError("Invalid email or password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Email Field */}
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          aria-label="Email"
          className="form-input"
          placeholder="Enter your email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          required
        />

        {/* Password Field */}
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            aria-label="Password"
            className="form-input password-input"
            placeholder="Enter your password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={togglePasswordVisibility}
            role="button"
            aria-label="Toggle password visibility"
            tabIndex="0"
            onKeyPress={(e) =>
              e.key === "Enter" && togglePasswordVisibility()
            } // Accessibility support
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="lg" />
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <p className="error-message" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
        <button
              type="submit"
              className="button"
              disabled={!loginEmail || !loginPassword} // Disable button if fields are empty
            >
              Log In
            </button>
      </form>
    </div>
  );
};

export default SectionLogin;
