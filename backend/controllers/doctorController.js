const doctorModel = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    //find doctor by id
    const doctor = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !doctor.available,
    });

    return res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get doctor data
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        success: false,
        message: "Doctor id is needed to provide",
      });
    }

    const doctor = await doctorModel.findById(id).select("-password");
    if (!doctor) {
      return res.json({ success: false, message: "No Doctor with this id" });
    }

    return res.json({ success: true, doctor });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//doctor login
const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Missing credentials" });
  }

  try {
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: doctor._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get appointments by doctorId
const appointmentsByDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    // Fetch doctors related to appointments
    const appointmentsWithPatients = await Promise.all(
      appointments.map(async (appointment) => {
        const user = await userModel.findById(appointment.userId); // Fetch doctor by docId
        return { ...appointment.toObject(), user }; // Convert to plain object
      })
    );

    return res.json({ success: true, appointments: appointmentsWithPatients });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getCurrentDoctor = async (req, res) => {
  try {
    const { docId } = req.body;

    const doctor = await doctorModel.findById(docId).select("-password");
    if (!doctor) {
      return res.json({ success: false, message: "No Doctor with this id" });
    }

    return res.json({ success: true, doctor });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//complete appointment
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (appointment && appointment.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (appointment && appointment.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get doctor dashboard data
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    appointments.map((appointment) => {
      if (appointment.isCompleted) {
        earnings += appointment.amount;
      }
    });

    console.log("earnings");
    console.log(earnings);

    let patients = [];
    appointments.map((appointment) => {
      if (!patients.includes(appointment.userId)) {
        patients.push(appointment.userId);
      }
    });

    // Fetch doctors related to appointments
    const appointmentsWithPatients = await Promise.all(
      appointments.map(async (appointment) => {
        const user = await userModel.findById(appointment.userId); // Fetch doctor by docId
        return { ...appointment.toObject(), user }; // Convert to plain object
      })
    );

    const dashboardData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointmentsWithPatients.reverse().slice(0, 10),
    };

    return res.json({ success: true, dashboardData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = {
  changeAvailability,
  getDoctorById,
  loginDoctor,
  appointmentsByDoctor,
  getCurrentDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
};
