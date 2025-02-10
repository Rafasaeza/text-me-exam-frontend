'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const ShowMessage = ({ messageId, user }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(`${backendUrl}messages/detail/${messageId}`);
        if (!res.ok) throw new Error("Error fetching message");
        const data = await res.json();
        setMessage(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [messageId, backendUrl]);

  if (loading) return <p>Loading message...</p>;
  if (!message) return <p>Message not found.</p>;

  const handleReply = () => {
    router.push(`/message/${messageId}/reply`);
  };

  // Verificar si el usuario es el destinatario
  const isRecipient = user && message.para === user.email;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{message.asunto}</h2>
      <p><strong>From:</strong> {message.de}</p>
      <p><strong>To:</strong> {message.para}</p>
      <p><strong>Date:</strong> {new Date(message.stamp).toLocaleString()}</p>
      <p className="mt-4">{message.contenido}</p>
      {message.adjunto && (
        <img src={message.adjunto} alt="Attachment" className="mt-4 max-w-xs" />
      )}

      {/* Botón para responder al mensaje solo si el usuario es el destinatario */}
      {isRecipient && (
        <button
          onClick={handleReply}
          className="mt-4 bg-blue-500 text-white py-2 px-4"
        >
          Reply to this message
        </button>
      )}
    </div>
  );
};

export default ShowMessage;
