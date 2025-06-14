import AddFriendForm from "./AddFriendForm";
import DisplayMessages from "./DisplayMessages";
import Header from "./Header";
import SendMessageInput from "./SendMessageInput";

export default function MainChat({
  currentUser,
  isChatStarted,
  recipientId,
  setRecipientId,
  setIsChatStarted,
  chats,
  roomId,
  message,
  sendMessage,
  setMessage,
}) {
  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <Header currentUser={currentUser} />

      {!isChatStarted ? (
        <AddFriendForm
          recipientId={recipientId}
          setRecipientId={setRecipientId}
          setIsChatStarted={setIsChatStarted}
        />
      ) : (
        <>
          <DisplayMessages chats={chats} roomId={roomId} />

          <SendMessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </>
      )}
    </div>
  );
}
