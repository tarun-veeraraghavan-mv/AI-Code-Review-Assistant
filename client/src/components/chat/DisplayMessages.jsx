export default function DisplayMessages({ chats, roomId }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        height: "60vh",
        overflowY: "scroll",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {(chats[roomId] || []).map((msg, i) => {
        const isMe = msg.startsWith("Me:");

        const displayMsg = isMe
          ? msg.replace("Me: ", "")
          : msg.replace(/.*?: /, "");

        return (
          <div
            key={i}
            style={{
              alignSelf: isMe ? "flex-end" : "flex-start",
              backgroundColor: isMe ? "#007bff" : "#f44336", // blue for me, red for others
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "20px",
              maxWidth: "60%",
              wordBreak: "break-word",
            }}
          >
            {displayMsg}
          </div>
        );
      })}
    </div>
  );
}
