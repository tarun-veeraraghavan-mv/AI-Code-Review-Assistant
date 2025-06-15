const CodeStandard = require("../models/CodeStandard");

exports.uploadCodeStandards = async (req, res) => {
  const { codeStandards, userId, fileName } = req.body;

  console.log("uploading standards...", codeStandards);

  const data = await CodeStandard.create({
    codeStandardContent: codeStandards,
    userId,
    fileName,
  });

  res.status(200).json(data);
};

exports.getCodeStandardsForUser = async (req, res) => {
  const { userId } = req.params;

  const data = await CodeStandard.findOne({ userId });

  res.status(200).json(data);
};

exports.getCodeStandardsById = async (req, res) => {
  const { id } = req.params;

  const data = await CodeStandard.findById(id);

  res.status(200).json(data);
};

exports.updateCodeStandards = async (req, res) => {
  const { id, codeStandards } = req.body;

  console.log(codeStandards);

  const newStandards = await CodeStandard.findByIdAndUpdate(
    id,
    { codeStandardContent: codeStandards },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(newStandards);
};
