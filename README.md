# Herramienta de Muestreo Estadístico

Esta es una aplicación web diseñada para ayudar a investigadores y analistas a seleccionar muestras estadísticamente válidas a partir de un conjunto de datos. La aplicación está construida con un backend de Python (FastAPI) y un frontend de JavaScript (React).

## Características

- Carga de datos desde archivos CSV y Excel.
- Previsualización de datos.
- Cálculo de tamaño de muestra basado en Nivel de Confianza y Margen de Error.
- Soporte para Muestreo Aleatorio Simple, Estratificado, Sistemático y por Conglomerados.
- Guías informativas interactivas para los parámetros y métodos de muestreo.
- Exportación de la muestra generada a CSV.

---

## Requisitos Previos

Antes de empezar, asegúrate de tener instalados:

- [Python](https://www.python.org/downloads/) (versión 3.8 o superior)
- [Node.js](https://nodejs.org/) (versión 16 o superior)

---

## Guía de Instalación y Ejecución

Sigue estos pasos para poner en marcha la aplicación.

### 1. Configuración del Backend (Python)

```bash
# 1. Navega a la carpeta del backend
cd backend

# 2. Crea un entorno virtual
python -m venv .venv

# 3. Activa el entorno virtual
# En Windows:
.\.venv\Scripts\activate
# En macOS/Linux:
# source .venv/bin/activate

# 4. Instala las dependencias
pip install -r requirements.txt
```

### 2. Configuración del Frontend (React)

```bash
# 1. Navega a la carpeta del frontend
cd frontend

# 2. Instala las dependencias
npm install
```

### 3. Ejecución de la Aplicación

Necesitarás **dos terminales** abiertas simultáneamente.

**Terminal 1 - Iniciar Backend:**

```bash
# Ve a la carpeta del backend y activa el entorno si no lo has hecho
cd backend
.\.venv\Scripts\activate

# Inicia el servidor de FastAPI
uvicorn app.main:app --reload
```
*El backend estará disponible en `http://127.0.0.1:8000`.*

**Terminal 2 - Iniciar Frontend:**

```bash
# Ve a la carpeta del frontend
cd frontend

# Inicia la aplicación de React
npm start
```
*La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`.*
