const CodeReview = require("../models/CodeReview");

exports.getAllReportsForUser = async (req, res) => {
  const { userId } = req.query;

  const reports = await CodeReview.find({ userId });

  res.status(200).json(reports);
};

exports.getReportById = async (req, res) => {
  const { reportId } = req.params;

  const report = await CodeReview.findOne({ _id: reportId });

  res.status(200).json(report);
};
