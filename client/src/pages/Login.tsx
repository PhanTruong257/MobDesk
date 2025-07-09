import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLoginMutation, useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from '../slices/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

const LoginForm = styled.div`
  padding: 3rem;
  
  h2 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 2rem;
    font-weight: 600;
  }
  
  p {
    color: #666;
    margin-bottom: 2rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e1e5e9;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s;
    
    &:focus {
      outline: none;
      border-color: #667eea;
    }
    
    &::placeholder {
      color: #aaa;
    }
  }
`;

const LoginButton = styled.button<{ loading?: boolean }>`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  opacity: ${props => props.loading ? 0.7 : 1};
  
  &:hover {
    transform: ${props => props.loading ? 'none' : 'translateY(-2px)'};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #fcc;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  background: #efe;
  color: #363;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #cfc;
  font-size: 0.9rem;
`;

const SocialLogin = styled.div`
  margin-top: 1.5rem;
  
  p {
    text-align: center;
    color: #666;
    margin-bottom: 1rem;
  }
  
  .social-buttons {
    display: flex;
    gap: 1rem;
    
    button {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      background: white;
      cursor: pointer;
      transition: border-color 0.3s;
      
      &:hover {
        border-color: #667eea;
      }
      
      &.google {
        color: #db4437;
      }
      
      &.facebook {
        color: #3b5998;
      }
    }
  }
`;

const LoginSidebar = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  
  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 2rem;
  }
  
  .features {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      
      &::before {
        content: "✓";
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
      }
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  
  button {
    background: none;
    border: none;
    color: #667eea;
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
  }
`;

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
    <LoginContainer>
      <LoginCard>
        <LoginForm>
          <h2>{isLogin ? "Welcome Back!" : "Create Account"}</h2>
          <p>{isLogin ? "Sign in to your account" : "Sign up for a new account"}</p>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <FormGroup>
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
              </FormGroup>
            )}

            <FormGroup>
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
            </FormGroup>

            <FormGroup>
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
            </FormGroup>

            {!isLogin && (
              <FormGroup>
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
              </FormGroup>
            )}

            <LoginButton type="submit" loading={isLoading} disabled={isLoading}>
              {isLoading
                ? (isLogin ? "Signing in..." : "Creating account...")
                : (isLogin ? "Sign In" : "Create Account")
              }
            </LoginButton>
          </form>

          <SocialLogin>
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
          </SocialLogin>

          <ToggleText>
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
          </ToggleText>
        </LoginForm>

        <LoginSidebar>
          <h3>Join MobDesk</h3>
          <p>Discover amazing products and exclusive deals</p>
          <ul className="features">
            <li>Fast & Secure Checkout</li>
            <li>Free Shipping on Orders $50+</li>
            <li>24/7 Customer Support</li>
            <li>Exclusive Member Discounts</li>
          </ul>
        </LoginSidebar>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;