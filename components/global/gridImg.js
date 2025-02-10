'use client'
import { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import './styles.css'; // Asegúrate de importar el archivo CSS

export default function GridImg({ email }) {
    const [userData, setUserData] = useState(null);

    // Realizamos el fetch solo una vez, cuando el componente se monte
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user?email=${email}`);
                const data = await response.json();
                setUserData(data); // Guardamos los datos en el estado
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [email]); // Dependemos de `email` para hacer la solicitud, y solo ejecutamos el efecto una vez

    // Si aún no se cargan los datos, mostramos un mensaje de carga
    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid-container">
            {userData.coordinates.map((coordinate) => (
                <div key={coordinate.urlImg} className="grid-item">
                    <CldImage 
                        width="200" 
                        height="200" 
                        src={coordinate.urlImg} 
                        alt="pointer-img" 
                        className="grid-image"
                    />
                </div>
            ))}
        </div>
    );
}
