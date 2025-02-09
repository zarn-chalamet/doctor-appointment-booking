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

module.exports = { changeAvailability };
