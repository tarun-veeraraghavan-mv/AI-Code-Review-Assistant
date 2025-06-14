import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../ui/Navbar";

const socket = io("http://localhost:3001");

function generateRoomId(id1, id2) {
  return `chat:${[id1, id2].sort().join("-")};`;
}

export default function Chat() {
  const { user: currentUser } = useAuth();
  const myId = currentUser._id;

  const [recipientId, setRecipientId] = useState("");
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState({});
  const [conversationUsers, setConversationUsers] = useState([]);

  const currentRoomRef = useRef("");

  // 👇 Fetch inbox and sent users and merge them
  useEffect(() => {
    if (!myId) return;

    const fetchConversations = async () => {
      try {
        const [sentRes, receivedRes] = await Promise.all([
          fetch(`http://localhost:3001/api/messages/sent/${myId}`),
          fetch(`http://localhost:3001/api/messages/received/${myId}`),
        ]);

        const sent = await sentRes.json();
        const received = await receivedRes.json();

        // Merge + deduplicate
        const all = Array.from(new Set([...sent, ...received])).filter(
          (id) => id !== myId
        );
        setConversationUsers(all);
      } catch (err) {
        console.error("Error fetching conversation users:", err);
      }
    };

    fetchConversations();
  }, [myId]);

  // 👇 Socket logic
  useEffect(() => {
    if (!myId || !recipientId) return;

    const roomId = generateRoomId(myId, recipientId);
    if (currentRoomRef.current !== roomId) {
      socket.emit("join_room", { from: myId, to: recipientId });
      currentRoomRef.current = roomId;
    }

    const handleReceiveMessage = ({ from, message }) => {
      const roomId = generateRoomId(myId, from);
      setChats((prev) => ({
        ...prev,
        [roomId]: [
          ...(prev[roomId] || []),
          `${from === myId ? "Me" : from}: ${message}`,
        ],
      }));
    };

    const handlePreviousMessages = (messages) => {
      setChats((prev) => {
        const newChats = { ...prev };
        newChats[currentRoomRef.current] = messages.map((m) => {
          const sender = m.from === myId ? "Me" : m.from;
          return `${sender}: ${m.message}`;
        });
        return newChats;
      });
    };

    socket.on("receive_private_message", handleReceiveMessage);
    socket.on("previous_messages", handlePreviousMessages);

    return () => {
      socket.off("receive_private_message", handleReceiveMessage);
      socket.off("previous_messages", handlePreviousMessages);
    };
  }, [myId, recipientId]);

  const sendMessage = () => {
    if (!message.trim() || !myId || !recipientId) return;

    const roomId = generateRoomId(myId, recipientId);

    socket.emit("send_private_message", {
      from: myId,
      to: recipientId,
      message,
    });

    setChats((prev) => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), `Me: ${message}`],
    }));

    setMessage("");
  };

  const roomId = generateRoomId(myId, recipientId);

  return (
    <div style={{ padding: "10px" }}>
      <Navbar />
      <div
        style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}
      >
        {/* Sidebar */}
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
            conversationUsers.map((uid) => (
              <div
                key={uid}
                onClick={() => {
                  setRecipientId(uid);
                  setIsChatStarted(true);
                }}
                style={{
                  padding: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  backgroundColor:
                    recipientId === uid ? "#f0f0f0" : "transparent",
                }}
              >
                {uid}
              </div>
            ))
          )}
        </div>

        {/* Main Chat */}
        <div style={{ flex: 1, padding: "20px" }}>
          <h2>Welcome, {currentUser.name}</h2>

          {!isChatStarted ? (
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
          ) : (
            <>
              <h3>Chat with: {recipientId}</h3>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  height: "60vh",
                  overflowY: "scroll",
                  marginBottom: "10px",
                }}
              >
                {(chats[roomId] || []).map((msg, i) => (
                  <p key={i}>{msg}</p>
                ))}
              </div>

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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
