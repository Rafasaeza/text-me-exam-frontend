import { connectDB } from "@/lib/mongodb";  // Importamos la función de conexión
import User from "@/models/User";  // Importamos el modelo de usuario
import { NextResponse } from "next/server";

export async function POST(request){

  const requestJson = await request.json();
  const email = requestJson.email; 

  await connectDB();  
  const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Si el usuario ya existe, no hacemos nada y devolvemos un mensaje
      return NextResponse.json(
        { message: "User already exists", status: 200 },
        { status: 200 }
      );
    } else {
      // Si el usuario no existe, lo creamos
      await User.create({ email });

      return NextResponse.json(
        { message: "User Registered", status: 201 },
        { status: 201 }
      );
    }
}


export async function PUT(request) {
  const requestJson = await request.json();  // Leemos el cuerpo de la solicitud
  const requestUrl = new URL(request.url);  // Obtenemos la URL de la solicitud
  const email = requestUrl.searchParams.get("email");  // Obtenemos el email de la URL
  const {lat, lon,urlImg } = requestJson;  // Obtenemos el email y las coordenadas

  // Verificamos que el email y las coordenadas estén presentes
  if (!email || lat === undefined || lon === undefined) {
    return NextResponse.json(
      { message: "Email, lat, and lon are required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();  // Conectamos a la base de datos

    // Verificamos si el usuario existe
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Actualizamos las coordenadas del usuario
    existingUser.coordinates.push({ lat, lon, urlImg });  // Añadimos la nueva coordenada al arreglo

    // Guardamos el usuario actualizado
    await existingUser.save();

    return NextResponse.json(
      { message: "Coordinate added successfully", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user coordinates:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  // Obtener el parámetro 'email' de la URL
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");  // Obtener el email del query string
  
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    // Conectar a la base de datos
    await connectDB();

    // Buscar el usuario por el email en la base de datos
    const user = await User.findOne({ email });

    if (!user) {
      // Si el usuario no existe
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Si el usuario existe, devolver la información del usuario
    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    // Manejo de errores
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}