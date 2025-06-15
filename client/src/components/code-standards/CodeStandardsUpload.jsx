import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { codeStandardsUpload, getCodeStandardsForUser } from "../../utils/api";
import AppButton from "../../ui/AppButton";
import { useNavigate } from "react-router-dom";

export default function CodeStandardsUpload() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [existingCodeStandards, setExistingCodeStandards] = useState(null);
  const navigate = useNavigate();

  console.log(existingCodeStandards?.codeStandardContent);

  useEffect(() => {
    async function getCodeStandards() {
      const res = await getCodeStandardsForUser(user._id);
      setExistingCodeStandards(res);
    }
    if (user) {
      getCodeStandards();
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile.name);
    }
  };

  const handleUploadFile = () => {
    if (!file) return;

    const fileName = file.name;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target?.result;
      const res = await codeStandardsUpload(text, fileName, user._id);
      setExistingCodeStandards(res);
      toast.success("Code Standards Uploaded!");
    };

    reader.onerror = (e) => {
      console.error("Error reading file:", e);
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {existingCodeStandards ? (
        <div style={{ fontSize: "18px" }}>
          <p style={{ marginBottom: "10px" }}>
            <strong>Existing file:</strong> {existingCodeStandards.fileName}
          </p>
          <AppButton
            backgroundColor="#007bff"
            onClick={() => {
              navigate(`/change-code-standards/${existingCodeStandards._id}`);
            }}
          >
            Change standards
          </AppButton>
        </div>
      ) : (
        <>
          <div>
            <p>
              Upload your code standards here: the format of the file has to be
              in Markdown (.md) format
            </p>
            <input type="file" accept=".md" onChange={handleFileChange} />
          </div>
          <div>
            <button
              onClick={() => {
                if (!user) {
                  toast.error("Signin to use this feature!");
                }
                handleUploadFile();
              }}
              disabled={!file}
            >
              Upload file
            </button>
          </div>
        </>
      )}
    </div>
  );
}
