export function formatCode(inputs) {
  const formattedResponse = inputs
    .map(
      (inp) =>
        `### ${inp.inputName} | written in ${inp.language}\n\n${inp.content}\n\n### End of ${inp.inputName}`
    )
    .join("\n\n");

  return formattedResponse;
}
