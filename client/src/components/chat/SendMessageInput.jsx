export default function SendMessageInput({ message, setMessage, sendMessage }) {
  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{ width: "70%", padding: "8px" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />
      <button onClick={sendMessage} style={{ padding: "8px" }}>
        Send
      </button>
    </div>
  );
}
