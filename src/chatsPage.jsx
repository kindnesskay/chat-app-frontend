import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Avatar from "./Avatar";
import Form from "./Form";
const ChatsPage = ({ user }) => {
  const [ws, setWs] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, []);

  function showOnline(peopleArray) {
    const people = {};
    peopleArray.forEach(({ username, userId }) => {
      people[userId] = username;
    });
    delete people[user.id];
    setOnlineUsers(people);
  }
  function handleMessage(e) {
    const data = JSON.parse(e.data);

    if ("online" in data) {
      showOnline(data.online);
    }
    if ("message" in data) {
      setMessages([...messages, data.message]);
    }
  }

  function handleSendMessage(value) {
    if (!value || !selectedUser) return false;
    const data = JSON.stringify({ message: value, recvID: selectedUser });
    setMessages([...messages, value]);
    ws.send(data);
  }
  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-6xl bg-slate-900 h-screen flex flex-col ">
        <Navbar />
        {selectedUser ? (
          <div className="flex flex-col h-full p-4 bg-slate-600">
            <div className="flex-grow h-4">
              <p className=" font-bold p-2 text-xl text-white">
                {onlineUsers[selectedUser]}
              </p>
            </div>
            <div>
              {messages.map((message) => {
                return message;
              })}
            </div>
            <Form handleSendMessage={handleSendMessage} />
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-white font-mono font-semibold">
            {Object.keys(onlineUsers).map((userId) => {
              return (
                <div
                  className={`${
                    selectedUser == userId ? "bg-slate-700" : ""
                  } p-4`}
                  key={userId}
                  onClick={() => setSelectedUser(userId)}
                >
                  <Avatar username={onlineUsers[userId]} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatsPage;
