// /app/message/[id]/reply/page.js
'use client';
import Footer from "@/components/global/footer";
import { useEffect, useState } from "react";
import Nav from "@/components/global/nav";
import { use } from "react";
import MessageForm from "@/components/forms/messageForm";  // Importamos el componente del formulario

const ReplyMessage = ({ params }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);  // Obtenemos el ID del mensaje a responder
  const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;

  useEffect(() => {
    if (!id) return;

    const fetchMessage = async () => {
      try {
        const res = await fetch(`${backendUrl}messages/detail/${id}`);
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
  }, [id, backendUrl]);

  if (loading) return <p>Loading message...</p>;
  if (!message) return <p>Message not found.</p>;

  return (
    <>
      <Nav />
      <div className="p-4">
        <MessageForm message={message} isReply={true} />  {/* Usamos MessageForm para responder */}
      </div>
      <Footer />
    </>
  );
};

export default ReplyMessage;
