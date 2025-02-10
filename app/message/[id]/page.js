// /app/message/[id]/page.js
import { auth } from "@/auth";  // Asegúrate de que esta función esté configurada en tu lib
import Footer from "@/components/global/footer";
import Nav from "@/components/global/nav";
import ShowMessage from "@/components/showMessage";

export default async function Page({ params }) {
  // Obtén la sesión del usuario en el servidor
  const session = await auth();

  // Si no hay sesión (el usuario no está autenticado), redirige al login
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Pasa el usuario a ShowMessage como prop
  return (
    <>
    <Nav/>
    <ShowMessage messageId={params.id} user={session.user} />
    <Footer/>
    </>);
}
