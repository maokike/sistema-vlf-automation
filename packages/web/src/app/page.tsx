'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This effect runs on the client-side
    const token = localStorage.getItem('authToken');
    if (!token) {
      // If no token is found, redirect to the login page
      router.push('/login');
    } else {
      // If a token is found, we can consider the user authenticated
      // (For higher security, you could also verify the token with the backend here)
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  // Render a loading state or null while we check for authentication
  if (!isAuthenticated) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Verificando autenticación...</p>
        </div>
    );
  }

  // If authenticated, show the main application content
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
        <header className="w-full bg-white shadow-md">
            <nav className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-xl font-bold text-indigo-600">Sistema de Informes VLF</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                >
                    Cerrar Sesión
                </button>
            </nav>
        </header>

        <main className="container mx-auto p-8 mt-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Generar Nuevo Dictamen VLF</h2>
                {/*
                    The form to create a new VLF report will be implemented here in Phase 3.
                    For now, this is a placeholder.
                */}
                <p className="text-gray-600">
                    Aquí irá el formulario para ingresar los datos del cliente, proyecto y distancia del cable.
                    Una vez completado, se podrá generar el informe en PDF.
                </p>
            </div>
        </main>
    </div>
  );
}
