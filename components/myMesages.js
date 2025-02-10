'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

const MyMessages = ({ emailUser }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${backendUrl}messages/${emailUser}`);
        if (!res.ok) throw new Error("Error fetching messages");
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [emailUser, backendUrl]);

  if (loading) return <p>Loading messages...</p>;
  if (!messages.length) return <p>No messages found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id} className="border p-2 mb-2">
            <Link href={`/message/${msg.id}`} className="block">
                <p><strong>From:</strong> {msg.de}</p>
                <p><strong>To:</strong> {msg.para}</p>
                <p><strong>Subject:</strong> {msg.asunto}</p>
                <p><strong>Date:</strong> {new Date(msg.stamp).toLocaleString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyMessages;