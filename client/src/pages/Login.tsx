import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from '../slices/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import './Login.css';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // Sử dụng typed dispatch

  // RTK Query hooks
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const isLoading = isLoginLoading || isRegisterLoading;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        // Handle login logic with RTK Query
        const result = await loginMutation({
          email: formData.email,
          password: formData.password
        }).unwrap();
        console.log("Login result:", result);

        if (result.success && result.data) {
          // Store tokens in localStorage (chỉ tokens)
          localStorage.setItem('accessToken', result.data.accessToken);
          localStorage.setItem('refreshToken', result.data.refreshToken);

          dispatch(setCredentials(result.data.user));

          setSuccess("Login successful! Redirecting...");

          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      } else {
        // Handle registration logic with RTK Query
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          return;
        }

        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long!");
          return;
        }

        const result = await registerMutation({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }).unwrap();

        if (result.success) {
          setSuccess("Registration successful! Please login with your credentials.");

          // Switch to login form after successful registration
          setTimeout(() => {
            setIsLogin(true);
            setFormData({
              email: formData.email, // Keep email for convenience
              password: "",
              confirmPassword: "",
              name: ""
            });
          }, 2000);
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);

      // Handle RTK Query errors
      if (err.data?.message) {
        setError(err.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError(isLogin ? "Login failed. Please try again." : "Registration failed. Please try again.");
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    setError("");
    setSuccess(`${provider} login will be implemented soon!`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-form">
          <h2>{isLogin ? "Welcome Back!" : "Create Account"}</h2>
          <p>{isLogin ? "Sign in to your account" : "Sign up for a new account"}</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form className="login-form1" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
            )}

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading
                ? (isLogin ? "Signing in..." : "Creating account...")
                : (isLogin ? "Sign In" : "Create Account")
              }
            </button>
          </form>

          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button
                className="google"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
              >
                Google
              </button>
              <button
                className="facebook"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={isLoading}
              >
                Facebook
              </button>
            </div>
          </div>

          <p className="toggle-text">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
                setFormData({
                  email: "",
                  password: "",
                  confirmPassword: "",
                  name: ""
                });
              }}
              disabled={isLoading}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        <div className="login-sidebar">
          <h3>Join MobDesk</h3>
          <p>Discover amazing products and exclusive deals</p>
          <ul className="features">
            <li>Fast & Secure Checkout</li>
            <li>Free Shipping on Orders $50+</li>
            <li>24/7 Customer Support</li>
            <li>Exclusive Member Discounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;