#!/usr/bin/env node

import readline from 'readline';
import axios from 'axios';
import https from 'https';

// Esto permite conexiones a URLs HTTPS con certificados autofirmados (como a veces usa Render en sus URLs internas)
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

async function createInitialUser() {
  console.log('--- Creación del Usuario Inicial ---');
  console.log('Este script registrará el primer usuario en la base de datos.');
  console.log('Solo puede ser usado una vez si la base de datos está vacía.\n');

  try {
    const apiUrl = await question('Introduce la URL de tu API en producción (ej: https://tu-api.onrender.com): ');
    if (!apiUrl) {
      console.error('\nError: La URL de la API es obligatoria.');
      return;
    }

    const email = await question('Introduce el correo electrónico para el administrador: ');
    if (!email) {
      console.error('\nError: El correo electrónico es obligatorio.');
      return;
    }

    const password = await question('Introduce la contraseña para el administrador: ');
    if (!password) {
      console.error('\nError: La contraseña es obligatoria.');
      return;
    }

    console.log(`\nRegistrando usuario con email: ${email}...`);

    await axios.post(
      `${apiUrl.trim()}/api/auth/register-initial-user`,
      {
        email: email.trim(),
        password: password.trim(),
      },
      { httpsAgent: agent }
    );

    console.log('\n¡Éxito! El usuario ha sido creado.');
    console.log('Ahora puedes iniciar sesión con estas credenciales en la página de login.');
  } catch (error) {
    console.error('\n--- Error al crear el usuario ---');
    if (error.response) {
      console.error(`Mensaje del servidor: ${error.response.data.message || JSON.stringify(error.response.data)}`);
      console.error(`Status: ${error.response.status}`);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor. Verifica que la URL de la API sea correcta y que el servicio esté en línea.');
    } else {
      console.error('Ocurrió un error inesperado:', error.message);
    }
  } finally {
    rl.close();
  }
}

createInitialUser();
