const CodeStandard = require("../models/CodeStandard");

exports.uploadCodeStandards = async (req, res) => {
  const { codeStandards, userId } = req.body;

  console.log("uploading standards...", codeStandards);

  const data = await CodeStandard.create({
    codeStandardContent: codeStandards,
    userId,
  });

  res.status(200).json(data);
};

exports.getCodeStandardsForUser = async (req, res) => {
  const { userId } = req.body;

  const data = await CodeStandard.findOne({ userId });

  res.status(200).json(data);
};
