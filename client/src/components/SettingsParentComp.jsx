import React from "react";
import { useState } from "react";
import SettingsButton from "./SettingsButton";
import SettingsPanel from "./SettingsPanel";

export default function SettingsParentComp({
  setEditorSettings,
  editorSettings,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <SettingsButton setOpen={setOpen} />
      {open && (
        <SettingsPanel
          setEditorSettings={setEditorSettings}
          setOpen={setOpen}
          editorSettings={editorSettings}
        />
      )}
    </div>
  );
}
