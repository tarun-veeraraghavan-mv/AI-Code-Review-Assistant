import { Editor } from "@monaco-editor/react";

export default function CodeEditorPanel({
  input,
  index,
  setInputs,
  editorSettings,
  language = "not given by user",
}) {
  return (
    <div>
      <Editor
        fontSize={editorSettings.fontSize}
        height="550px"
        language={language}
        value={input.content}
        theme={editorSettings.theme}
        onChange={(val) =>
          setInputs((inputs) =>
            inputs.map((inp, i) =>
              i === index ? { ...inp, content: val } : inp
            )
          )
        }
        options={{
          fontSize: editorSettings.fontSize,
          minimap: { enabled: true },
          automaticLayout: true,
          scrollBeyondLastLine: true,
          wordWrap: "on",
          lineNumbers: "on",
          tabSize: editorSettings.tabSize,
        }}
      />
    </div>
  );
}
