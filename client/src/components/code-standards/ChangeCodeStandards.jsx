import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../ui/Navbar";
import { useEffect, useState } from "react";
import { getCodeStandardsById, updateCodeStandards } from "../../utils/api";
import MDEditor from "@uiw/react-md-editor";
import AppButton from "../../ui/AppButton";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

export default function ChangeCodeStandards() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [codeStandards, setCodeStandards] = useState("");

  console.log(codeStandards);

  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    async function fetchCodeStandards() {
      try {
        setLoading(true);
        const res = await getCodeStandardsById(id);
        console.log(res);
        setCodeStandards(res.codeStandardContent);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCodeStandards();
  }, [id]);

  async function handleUpdateStandards() {
    const res = await updateCodeStandards(id, codeStandards);
    toast.success("Code standards updated");
    console.log(res);
  }

  return (
    <div style={{ padding: "10px" }}>
      <Navbar />
      <div style={{ marginBottom: "20px" }}>
        {loading ? (
          "Loading..."
        ) : (
          <div>
            <p>Code standards to change: {id}</p>
            <div>{codeStandards?.codeStandardContent}</div>
            <MDEditor
              value={codeStandards}
              onChange={setCodeStandards}
              height={500}
            />
          </div>
        )}
      </div>
      <AppButton backgroundColor="#007bff" onClick={handleUpdateStandards}>
        Update code standards
      </AppButton>
    </div>
  );
}
