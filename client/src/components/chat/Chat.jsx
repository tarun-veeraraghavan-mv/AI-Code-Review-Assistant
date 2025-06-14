import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../ui/Navbar";
import { getUserbyId } from "../../utils/api";
import UserListSidebar from "./UserListSidebar";
import MainChat from "./MainChat";

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
        const allIds = Array.from(new Set([...sent, ...received])).filter(
          (id) => id !== myId
        );

        console.log(allIds);

        const usersWithNames = await Promise.all(
          allIds.map(async (id) => {
            try {
              const user = await getUserbyId(id);
              return { id, name: user.name || id }; // fallback to ID
            } catch (e) {
              console.error("Error fetching user name:", e);
              return { id, name: id }; // fallback
            }
          })
        );

        console.log(usersWithNames);
        setConversationUsers(usersWithNames);
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
        <UserListSidebar
          setRecipientId={setRecipientId}
          conversationUsers={conversationUsers}
          setIsChatStarted={setIsChatStarted}
          recipientId={recipientId}
        />

        <MainChat
          setRecipientId={setRecipientId}
          setIsChatStarted={setIsChatStarted}
          currentUser={currentUser}
          isChatStarted={isChatStarted}
          recipientId={recipientId}
          chats={chats}
          roomId={roomId}
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}
