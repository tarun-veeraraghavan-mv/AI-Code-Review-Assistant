import { useState } from "react";
import SettingsButton from "./SettingsButton";
import SettingsPanel from "./SettingsPanel";

export default function SettingsParentComp({ setEditorSettings }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <SettingsButton setOpen={setOpen} />
      {open && (
        <SettingsPanel
          setEditorSettings={setEditorSettings}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
