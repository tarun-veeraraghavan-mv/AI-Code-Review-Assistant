import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../ui/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { getAllReportsForUser } from "../../utils/api";
import CodeReport from "./CodeReport";
import { downloadPDF } from "../../utils/fileSave";
import RenderReportLists from "./RenderReportLists";

export default function ReportList() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [currentReport, setCurrentReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReportsForUser() {
      try {
        setLoading(true);
        const data = await getAllReportsForUser(user?._id);
        console.log(data);
        setData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchReportsForUser();
  }, [user?._id]);

  return (
    <div style={{ padding: "10px" }}>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Navbar />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.25fr 1fr",
              padding: "10px",
            }}
          >
            <div style={{ backgroundColor: "#eee" }}>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "10px 20px",
                }}
              >
                <h2>All your past reports</h2>
                <RenderReportLists
                  data={data}
                  setCurrentReport={setCurrentReport}
                />
              </ul>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              {currentReport && (
                <>
                  <button onClick={downloadPDF}>Donwload report as PDF</button>
                  <CodeReport review={currentReport} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
