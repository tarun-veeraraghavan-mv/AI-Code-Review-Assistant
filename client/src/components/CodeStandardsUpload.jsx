import { useState } from "react";

export default function CodeStandardsUpload() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target?.result);
    };
    reader.readAsText(selectedFile);
  };

  console.log(fileContent);

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
