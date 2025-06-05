export default function RenderList({ list }) {
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "18px",
      }}
    >
      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
