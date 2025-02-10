"use client";
import { useRouter } from "next/navigation"; // Usamos useRouter de next/navigation
import { useState } from "react";

export default function FormularioCiudadPage() {
  const [location, setLocation] = useState(""); // Almacena la ubicación del input
  const router = useRouter(); // Instancia del router

  const getCoordinatesFromLocation = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    if (!location) return;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${location}&format=json`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const newPosition = [
        parseFloat(data[0].lat),
        parseFloat(data[0].lon),
      ];

      // Construir la URL con parámetros de búsqueda
      const queryParams = new URLSearchParams({
        lat: newPosition[0],
        lon: newPosition[1],
        city: location,
      });

      // Navegar a la página del mapa con los parámetros lat y lon
      router.push(`/map?${queryParams.toString()}`); // Pasamos los parámetros en la URL
    } else {
      alert("No se pudo encontrar la ubicación.");
    }
  };

  return (
    
    <div style={styles.container}>
      <form style={styles.form} onSubmit={getCoordinatesFromLocation}>
        <input
          type="text"
          placeholder="¿En qué ciudad te encuentras?"
          style={styles.input}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" style={styles.button}>
          Continuar
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5", // Fondo suave
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
