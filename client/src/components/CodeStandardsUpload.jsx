import { useEffect, useState } from "react";
import { codeStandardsUpload, getCodeStandardsForUser } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

export default function CodeStandardsUpload({ setFileContent }) {
  const [file, setFile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchCodeStandards() {
      const res = await getCodeStandardsForUser();
      console.log(res);
    }
    fetchCodeStandards();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target?.result;
      setFileContent(fileContent);

      // Upload the code standards to the backend
      try {
        const response = await codeStandardsUpload(fileContent, user?._id);
        console.log("Code standards uploaded successfully:", response);
      } catch (err) {
        console.error("Error uploading code standards:", err);
      }
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <p
        style={{
          fontSize: "18px",
          color: "#333",
          lineHeight: "1.5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Upload any code standard document that you have in markdown(.md) format.
        The review bot will give suggestions based on it also
      </p>
      <input
        type="file"
        onChange={handleFileChange}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      />
      {file && (
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            margin: "0",
          }}
        >
          Selected File: {file.name}
        </p>
      )}
    </div>
  );
}
