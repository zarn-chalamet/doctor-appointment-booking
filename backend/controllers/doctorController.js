const doctorModel = require("../models/doctorModel");

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

module.exports = { changeAvailability, getDoctorById };
