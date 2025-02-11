const bcrypt = require("bcryptjs");
const { v2: cloudinary } = require("cloudinary");
const doctorModel = require("../models/doctorModel");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    //checking all the data
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //validate strong passwor
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  //check the inputs are null or not
  if (!email || !password) {
    return res.json({ success: false, message: "Invalid Email" });
  }

  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.ACCESS_TOKEN_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//api to get all doctors list for admin panel
const getAllDoctors = async (req, res) => {
  try {
    //remove password
    const doctors = await doctorModel.find({}).select("-password");

    return res.json({ success: true, doctors: doctors });
  } catch (error) {
    return res.json({ success: false, message: "this ran" });
  }
};

//get all appointments as an admin
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find();

    // Fetch doctors related to appointments
    const appointmentsToRetrun = await Promise.all(
      appointments.map(async (appointment) => {
        // Fetch doctor by docId
        const doctor = await doctorModel.findById(appointment.docId);
        //fetch user by userId
        const user = await userModel.findById(appointment.userId);
        return { ...appointment.toObject(), doctor, user }; // Convert to plain object
      })
    );
    return res.json({ success: true, appointments: appointmentsToRetrun });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = { addDoctor, loginAdmin, getAllDoctors, getAllAppointments };
