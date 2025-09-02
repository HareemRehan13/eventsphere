import React, { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // eye icon

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      // 👉 Yahan API call hogi (backend OTP send karega)
      // abhi demo ke liye random OTP generate karte hain
      const otpCode = Math.floor(100000 + Math.random() * 900000);
      setGeneratedOtp(otpCode);

      toast.success(`OTP sent to ${email} (demo OTP: ${otpCode})`);
      setStep(2);
    } catch (err) {
      console.error("Forgot Password Error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp == generatedOtp) {
      toast.success("OTP verified successfully");
      setStep(3);
    } else {
      toast.error("Invalid OTP, please try again");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // 👉 API call yahan hogi password update ke liye
    toast.success("Password reset successfully!");

    // form clear + back to step 1
    setStep(1);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a192f, #172a45)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "30px",
          borderRadius: "12px",
          background: "#0a192f",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.6)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "26px",
            color: "#ff6b35",
            fontWeight: "bold",
          }}
        >
          Forgot Password
        </h2>

        {/* STEP 1: Email */}
        {step === 1 && (
          <form
            onSubmit={handleSendOtp}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                margin: "12px 0",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ff6b35",
                background: "#112240",
                fontSize: "15px",
                outline: "none",
                color: "#fff",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "18px",
                padding: "12px",
                background: "#ff6b35",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <form
            onSubmit={handleVerifyOtp}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={{
                width: "100%",
                margin: "12px 0",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ff6b35",
                background: "#112240",
                fontSize: "15px",
                outline: "none",
                color: "#fff",
              }}
            />
            <button
              type="submit"
              style={{
                marginTop: "18px",
                padding: "12px",
                background: "#ff6b35",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* STEP 3: Reset Password */}
        {step === 3 && (
          <form
            onSubmit={handleResetPassword}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* New Password with eye toggle */}
            <div style={{ position: "relative", margin: "12px 0" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ff6b35",
                  background: "#112240",
                  fontSize: "15px",
                  outline: "none",
                  color: "#fff",
                }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#ff6b35",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Confirm Password with eye toggle */}
            <div style={{ position: "relative", margin: "12px 0" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ff6b35",
                  background: "#112240",
                  fontSize: "15px",
                  outline: "none",
                  color: "#fff",
                }}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#ff6b35",
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button
              type="submit"
              style={{
                marginTop: "18px",
                padding: "12px",
                background: "#ff6b35",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
