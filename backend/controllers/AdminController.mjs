import Admin from "../models/AdminModel.mjs";

// fixed password (ye aap change kr skte ho)
const FIXED_ADMIN_PASSWORD = "Admin@123";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check password
    if (password !== FIXED_ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin password" });
    }

    // check if admin already exists
    let admin = await Admin.findOne({ email });

    if (!admin) {
      // agar new admin login krega to db me save ho jayega
      admin = new Admin({ email });
      await admin.save();
    }

    res.json({
      message: "Admin login successful",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
