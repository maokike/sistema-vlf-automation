import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

type Inputs = {
  clientName: string;
  projectName: string;
  cableLengthMeters: number;
  workType: 'NUEVA_CONSTRUCCION' | 'REMODELACION';
};

const Home: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await axios.post(`${apiUrl}/api/reports`, data, {
        responseType: 'blob', // Important: we expect a binary file back
      });

      // Create a Blob from the PDF stream
      const file = new Blob(
        [response.data],
        { type: 'application/pdf' }
      );

      // Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      // Open the URL on new Window
      window.open(fileURL);

    } catch (error) {
      console.error('Failed to generate report', error);
      setErrorMessage('No se pudo generar el dictamen. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sistema de Informes VLF</title>
        <meta name="description" content="Generación de informes de pruebas VLF" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Generador de Dictamen de Prueba VLF
        </h1>

        <p className={styles.description}>
          Ingrese los datos del proyecto para generar el informe.
        </p>

        <div className={styles.grid}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="clientName">Cliente</label>
              <input {...register("clientName", { required: true })} />
              {errors.clientName && <span className={styles.error}>Este campo es requerido.</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="projectName">Proyecto</label>
              <input {...register("projectName", { required: true })} />
              {errors.projectName && <span className={styles.error}>Este campo es requerido.</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cableLengthMeters">Distancia del Cable (metros)</label>
              <input type="number" {...register("cableLengthMeters", { required: true, valueAsNumber: true })} />
              {errors.cableLengthMeters && <span className={styles.error}>Este campo es requerido.</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="workType">Tipo de Obra</label>
              <select {...register("workType")}>
                <option value="NUEVA_CONSTRUCCION">Nueva Construcción (46,000V)</option>
                <option value="REMODELACION">Remodelación (35,000V)</option>
              </select>
            </div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Generando...' : 'Generar Dictamen PDF'}
            </button>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
