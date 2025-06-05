import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllReportsForUser, getReportById } from "../utils/api";
import CodeReport from "./CodeReport";
import { downloadPDF } from "../utils/fileSave";
import { useAuth } from "../contexts/AuthContext";

export default function Reports() {
  const { reportId } = useParams();
  const { user } = useAuth();

  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    async function fetchAllReportsForUser() {
      const data2 = await getAllReportsForUser(user?._id);
      console.log(data2);
      setData2(data2);
    }
    fetchAllReportsForUser();
  }, [user?._id]);

  useEffect(() => {
    async function fetchReportById() {
      const report = await getReportById(reportId);
      setData(report);
    }
    fetchReportById();
  }, [reportId]);

  console.log(data);

  return (
    <div>
      {data && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.3fr 1fr",
            padding: "10px",
          }}
        >
          <div>
            <ul>
              {data2?.map((d) => (
                <li>{d._id}</li>
              ))}
            </ul>
          </div>
          <div>
            <button onClick={downloadPDF}>Donwload report as PDF</button>
            <CodeReport review={data} />
          </div>
        </div>
      )}
    </div>
  );
}
