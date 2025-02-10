import { auth } from "@/auth";  // Asumiendo que auth está correctamente configurado
import MessageForm from "@/components/forms/messageForm"; // Importa el formulario de mensaje
import Footer from "@/components/global/footer";
import Nav from "@/components/global/nav";

export default async function NewMessage() {
  const session = await auth(); // Ejecuta la autenticación en el servidor
  const user = session.user;

  // Si no está autenticado, muestra un mensaje
  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <>
      <Nav />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">New Message</h2>
        <MessageForm emailUser={user.email}/>  {/* Incluye el formulario para crear un nuevo mensaje */}
      </div>
      <Footer />
    </>
  );
}
