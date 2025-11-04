import type { NextPage } from 'next';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'; // Reusing styles for consistency

type Inputs = {
  username: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await axios.post(`${apiUrl}/api/auth/login`, data);

      // On successful login, we'll get a token. We need to store it.
      // For simplicity, we'll use localStorage for now.
      localStorage.setItem('authToken', response.data.token);

      // Redirect to the main page
      router.push('/');

    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Usuario o contraseña inválidos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Iniciar Sesión - Sistema de Informes VLF</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Iniciar Sesión
        </h1>

        <div className={styles.grid}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Usuario</label>
              <input {...register("username", { required: "Este campo es requerido." })} />
              {errors.username && <span className={styles.error}>{errors.username.message}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input type="password" {...register("password", { required: "Este campo es requerido." })} />
              {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </button>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
