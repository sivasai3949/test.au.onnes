// seedAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const AdminUser = require('./Admin/models/AdminUser');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // 🔍 This email check must match the one you're creating below
    const existing = await AdminUser.findOne({ email: '@gmail.com' });
    if (existing) {
      console.log('⚠️ Admin already exists');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('', 10);

    const admin = new AdminUser({
      email: '@gmail.com', // ✅ MATCHED HERE
      password: hashedPassword,
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
