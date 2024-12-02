import { useState } from "react";

export default function Form({ handleSendMessage }) {
  const [message, setMessage] = useState("");

  return (
    <div>
      <div className="w-full flex items-centerh-fit rounded-lg overflow-hidden">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="h-12 flex-grow px-4"
          placeholder="Send a message"
        />
        <button
          className="text-md font-semibold text-white h-12 px-4 w-16 bg-blue-500"
          onClick={() => {
            handleSendMessage(message);
            setMessage("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8- h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
