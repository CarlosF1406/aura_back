// Este archivo es el punto de entrada de la aplicación. Aquí se configura la aplicación y se exporta para poder ser importada en otros archivos.

import express from 'express';
import morgan from 'morgan'; // Morgan se encarga de mostrar en consola las peticiones que se hacen al servidor

const app = express(); // Una vez importado express, creamos una instancia de la aplicación

app.use(morgan('dev')); // Usamos morgan en modo 'dev'

export default app; // Exportamos la aplicación para poder importarla en otros archivos