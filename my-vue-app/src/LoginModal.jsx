import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose, onSignupClick }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [step, setStep] = useState("login"); // 'login', 'forgot', 'otp', 'newPassword'
  const dummyOtp = '123456';
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Reset all fields and step
  const resetAll = () => {
    setForm({ email: "", password: "" });
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    setIsLoading(false);
    setPasswordError("");
    setStep("login");
  };

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    if (!forgotEmail) {
      setError("Please enter your email address.");
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      setSuccess("OTP has been sent to your email address.");
      alert(`Your demo OTP is: ${dummyOtp}`);
      setIsLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }
    // Simulate login (replace with backend call if needed)
    setTimeout(() => {
      setIsLoading(false);
      alert("Login successful! Welcome back!");
      resetAll();
      onClose();
      window.location.reload();
    }, 1000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === dummyOtp) {
      setStep("newPassword");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    if (!newPassword || !confirmPassword) {
      setPasswordError("Please fill in both fields.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    alert('Password reset successful! You can now log in with your new password.');
    resetAll();
    onClose();
  };

  // Modal content by step
  let modalContent;
  if (step === "login") {
    modalContent = (
      <>
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Serendip Waves Logo" width="80" height="80" className="mb-3" />
          <h2 className="fw-bold mb-0 text-white">Login to Serendip Waves</h2>
        </div>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-white">Email Address</label>
            <input type="email" className="form-control form-control-lg" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" style={inputStyle} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold text-white">Password</label>
            <input type="password" className="form-control form-control-lg" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" style={inputStyle} />
            <div className="form-text" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Your password must be at least 6 characters long.
            </div>
          </div>
          <div className="mb-3 text-end">
            <span
              className="fw-semibold"
              style={{ color: '#ffd600', cursor: 'pointer', fontSize: '0.9rem' }}
              onClick={() => { setStep("forgot"); setError(""); setSuccess(""); }}
            >
              Forgot Password?
            </span>
          </div>
          <div className="d-grid mb-4">
            <button 
              type="submit" 
              className="btn btn-warning btn-lg fw-bold" 
              style={buttonStyle}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>
          <div className="text-center">
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>
              Don't have an account?{' '}
              <span
                className="fw-semibold"
                style={{ color: '#ffd600', cursor: 'pointer' }}
                onClick={() => {
                  resetAll();
                  onClose();
                  if (onSignupClick) onSignupClick();
                }}
              >
                Sign up
              </span>
            </span>
          </div>
        </form>
      </>
    );
  } else if (step === "forgot") {
    modalContent = (
      <>
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Serendip Waves Logo" width="80" height="80" className="mb-3" />
          <h2 className="fw-bold mb-0 text-white">Reset Password</h2>
        </div>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="form-label fw-semibold text-white">Email Address</label>
            <input 
              type="email" 
              className="form-control form-control-lg" 
              value={forgotEmail} 
              onChange={e => setForgotEmail(e.target.value)} 
              placeholder="Enter your email" 
              style={inputStyle} 
            />
          </div>
          <div className="d-grid mb-4">
            <button 
              type="submit" 
              className="btn btn-warning btn-lg fw-bold" 
              style={buttonStyle}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
          <div className="text-center">
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>
              Remember your password?{' '}
              <span
                className="fw-semibold"
                style={{ color: '#ffd600', cursor: 'pointer' }}
                onClick={() => { setStep("login"); setError(""); setSuccess(""); }}
              >
                Back to Login
              </span>
            </span>
          </div>
        </form>
      </>
    );
  } else if (step === "otp") {
    modalContent = (
      <>
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Serendip Waves Logo" width="80" height="80" className="mb-3" />
          <h2 className="fw-bold mb-0 text-white">Enter OTP</h2>
        </div>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold text-white">OTP</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="Enter the OTP you received"
              style={inputStyle}
            />
          </div>
          <div className="d-grid mb-4">
            <button
              type="submit"
              className="btn btn-warning btn-lg fw-bold"
              style={buttonStyle}
            >
              Submit OTP
            </button>
          </div>
        </form>
      </>
    );
  } else if (step === "newPassword") {
    modalContent = (
      <>
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Serendip Waves Logo" width="80" height="80" className="mb-3" />
          <h2 className="fw-bold mb-0 text-white">Set New Password</h2>
        </div>
        <form onSubmit={handleNewPasswordSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-white">New Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              style={inputStyle}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold text-white">Confirm Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              style={inputStyle}
            />
          </div>
          {passwordError && <div className="alert alert-danger text-center">{passwordError}</div>}
          <div className="d-grid mb-4">
            <button
              type="submit"
              className="btn btn-warning btn-lg fw-bold"
              style={buttonStyle}
            >
              Reset Password
            </button>
          </div>
        </form>
      </>
    );
  }

  return (
    <div style={overlayStyle} onClick={() => { resetAll(); onClose(); }}>
      <div
        className="card border-0 shadow-lg position-relative"
        style={cardStyle}
        onClick={e => e.stopPropagation()}
      >
        <button
          style={closeBtnStyle}
          onClick={() => { resetAll(); onClose(); }}
          aria-label="Close login modal"
        >
          &times;
        </button>
        <div className="card-body p-5">
          {modalContent}
        </div>
      </div>
      <style>{`
        .form-control:focus {
          background: rgba(255,255,255,0.2) !important;
          border-color: #ffd600 !important;
          box-shadow: 0 0 0 0.2rem rgba(255, 214, 0, 0.25) !important;
          color: #fff !important;
          backdrop-filter: blur(15px) !important;
        }
        .form-control::placeholder { color: rgba(255,255,255,0.6) !important; }
        .btn-warning:hover:not(:disabled) {
          background: rgba(255, 193, 7, 1) !important;
          border-color: rgba(255, 193, 7, 1) !important;
          transform: translateY(-2px);
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
        }
        .login-modal-close-btn {
          transition: background 0.2s;
        }
        .login-modal-close-btn:hover {
          background: rgba(255,255,255,0.2) !important;
          color: #ffd600 !important;
        }
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
        }
        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          padding: 1px;
          background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.45)",
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cardStyle = {
  borderRadius: 24,
  background: "rgba(255, 255, 255, 0.13)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(20px)",
  border: "1.5px solid rgba(255,255,255,0.18)",
  color: "#fff",
  maxWidth: '420px',
  minWidth: '340px',
  width: '100%',
  position: 'relative',
  padding: '40px 32px',
  boxSizing: 'border-box',
  margin: 'auto',
  display: 'block',
};

const closeBtnStyle = {
  position: "absolute",
  top: 18,
  right: 22,
  background: "none",
  border: "none",
  fontSize: 32,
  color: "#fff",
  cursor: "pointer",
  zIndex: 2
};

const inputStyle = {
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.3)',
  background: 'rgba(255,255,255,0.1)',
  color: '#fff',
  backdropFilter: 'blur(10px)'
};

const buttonStyle = {
  borderRadius: '10px',
  fontSize: '1.1rem',
  padding: '12px',
  background: 'rgba(255, 193, 7, 0.9)',
  border: '1px solid rgba(255, 193, 7, 0.3)',
  backdropFilter: 'blur(10px)',
  color: '#000',
  fontWeight: 700
};

export default LoginModal; 