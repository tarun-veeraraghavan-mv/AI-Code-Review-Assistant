import { useState } from "react";

export function useInputs() {
  const [inputs, setInputs] = useState([
    { inputName: "", content: "", language: "" },
  ]);

  function addInput() {
    setInputs((prev) => [
      ...prev,
      { inputName: "", content: "", language: "" },
    ]);
  }

  function deleteInput(index) {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  }

  function updateInput(index, field, value) {
    setInputs((prev) =>
      prev.map((inp, i) => (i === index ? { ...inp, [field]: value } : inp))
    );
  }

  function clearInput(index) {
    setInputs((prev) =>
      prev.map((inp, i) => (index === i ? { ...inp, content: "" } : inp))
    );
  }

  return {
    inputs,
    setInputs,
    addInput,
    deleteInput,
    updateInput,
    clearInput,
  };
}
