import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportById } from "../utils/api";
import CodeReport from "./CodeReport";
import { downloadPDF } from "../utils/fileSave";
import Navbar from "./Navbar";

export default function Reports() {
  const { reportId } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchReportById() {
      const report = await getReportById(reportId);
      setData(report);
    }
    fetchReportById();
  }, [reportId]);

  console.log(data);

  return (
    <div style={{ padding: "10px" }}>
      <Navbar />
      {data && (
        <div>
          <button onClick={downloadPDF}>Download report as PDF</button>
          <CodeReport review={data} />
        </div>
      )}
    </div>
  );
}
