export default function AddFriendForm({
  recipientId,
  setRecipientId,
  setIsChatStarted,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter recipient user ID"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
      <button
        onClick={() => {
          if (recipientId.trim()) setIsChatStarted(true);
        }}
        style={{ marginLeft: "10px", padding: "8px" }}
      >
        Start Chat
      </button>
    </div>
  );
}
