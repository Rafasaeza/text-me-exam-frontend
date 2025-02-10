'use client';
import { userAgent } from "next/server";
import { useState, useEffect } from "react";

const MessageForm = ({ message, isReply = false, emailUser }) => {
  const [de, setDe] = useState('');
  const [para, setPara] = useState('');
  const [asunto, setAsunto] = useState('');
  const [contenido, setContenido] = useState('');
  const [adjunto, setAdjunto] = useState(null); // URL de la imagen
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false); // Para la subida de imagen
  const [imageUrl, setImageUrl] = useState(null); // Guardar URL de la imagen subida

  const backendUrl = process.env.NEXT_PUBLIC_URL_BACKEND;

  useEffect(()=>{
    if(!isReply){
        setDe(emailUser);
    }
  },[])
  useEffect(() => {
    if (isReply && message) {
      setDe(message.para);
      setPara(message.de);
      setAsunto(`Re: ${message.asunto}`);
      setContenido(`\n\n--- Original Message ---\nFrom: ${message.de}\nTo: ${message.para}\nDate: ${new Date(message.stamp).toLocaleString()}\n\n${message.contenido}`);
    }
  }, [isReply, message]);

  // Subida de imagen
  const handleImageUpload = async (file) => {
    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/image-upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Image upload failed");

      const data = await res.json();
      setImageUrl(data.url);
      setAdjunto(data.url); // Guardamos la URL para enviarla al backend
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Enviar el mensaje con los datos como JSON
    const messageData = {
      de,
      para,
      asunto,
      contenido,
      adjunto: adjunto || null, // Si no hay imagen, adjunto es null
    };

    try {
      const res = await fetch(`${backendUrl}messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData), // Enviamos los datos como JSON
      });

      if (!res.ok) {
        throw new Error("Error sending message");
      }

      alert("Message sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send the message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{isReply ? 'Reply to Message' : 'New Message'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">From</label>
          <input
            type="email"
            value={isReply?de: emailUser}
            onChange={(e) => setDe(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-medium">To</label>
          <input
            type="email"
            value={para}
            onChange={(e) => setPara(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-medium">Subject</label>
          <input
            type="text"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-medium">Message Content</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="border p-2 w-full h-40"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-medium">Attachment (Optional, la imagen puede que no cargue la primera vez, si falla repetir)</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="border p-2 w-full"
          />
          {uploadingImage && <p>Uploading image...</p>}
          {imageUrl && <p>Image uploaded: <a href={imageUrl} target="_blank" rel="noopener noreferrer">View Image</a></p>}
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
