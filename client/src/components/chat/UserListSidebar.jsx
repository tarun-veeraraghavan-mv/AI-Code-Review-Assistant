export default function UserListSidebar({
  conversationUsers,
  setRecipientId,
  setIsChatStarted,
  recipientId,
}) {
  return (
    <div
      style={{
        width: "250px",
        borderRight: "1px solid #ccc",
        padding: "10px",
        overflowY: "auto",
      }}
    >
      <h3>Conversations</h3>
      {conversationUsers.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        conversationUsers.map((user) => {
          return (
            <div
              key={user.id}
              onClick={() => {
                setRecipientId(user.id);
                setIsChatStarted(true);
              }}
              style={{
                padding: "10px",
                marginBottom: "5px",
                cursor: "pointer",
                backgroundColor:
                  recipientId === user.id ? "#f0f0f0" : "transparent",
              }}
            >
              {user.name}
            </div>
          );
        })
      )}
    </div>
  );
}
