import { auth } from "@/auth";
import Footer from "@/components/global/footer";
import FormularioCrearSala from "@/components/myMesages";
import Nav from "@/components/global/nav";
import MyMessages from "@/components/myMesages";

export default async function crearPelicula() {
  const session = await auth(); // Ejecuta auth en el servidor
  const user = session.user;
  console.log("Datos del usuario:", user);
  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <>
    <Nav></Nav>
    <MyMessages emailUser={user.email} />
    <Footer></Footer>
    </>
);
}