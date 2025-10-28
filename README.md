# 🏫 Colegio José Martí — Frontend Institucional

Este repositorio contiene el desarrollo del sitio web institucional del Colegio José Martí, enfocado en accesibilidad, excelencia visual y estructura modular. El proyecto está construido con React y Tailwind CSS, integrando animaciones suaves, componentes escalables y una narrativa educativa emocional.

---

## 🚀 Instalación y ejecución local

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/colegio-jose-marti.git
cd colegio-jose-marti

2. Instala las dependencias

npm install

Asegúrate de tener Node.js ≥ 18 y npm ≥ 9 instalados.

3. Ejecuta el servidor de desarrollo
bash
npm run dev
El sitio estará disponible en http://localhost:5173

🌐 Variables de entorno
Crea un archivo .env en la raíz del proyecto con:

env
VITE_API_URL=https://colegio-jose-marti-backend.onrender.com
En desarrollo local puedes usar http://localhost:3000 si el backend corre localmente.

🧱 Tecnologías utilizadas
⚛️ React — Librería principal para la UI

🎨 Tailwind CSS — Estilización rápida y responsiva

🎞️ Framer Motion — Animaciones suaves y accesibles

📦 React Icons — Iconografía institucional

🧠 React Intersection Observer — Activación de animaciones por scroll

📁 Estructura del proyecto
Código
src/
├── assets/            # Imágenes y recursos institucionales
├── components/        # Componentes reutilizables (Navbar, Footer, HeroSection, etc.)
├── layout/            # MainLayout con Navbar y Footer integrados
├── pages/             # Vistas principales (Home, About, Contact)
├── services/          # Lógica de conexión con el backend (authService, etc.)
├── utils/             # Utilidades compartidas (cookieUtils, etc.)
├── App.jsx            # Enrutamiento principal
└── main.jsx           # Punto de entrada
✨ Características destacadas
Diseño emocional y profesional inspirado en Apple y Disney+

Animaciones activadas por scroll con rebotes suaves

Carrusel institucional con imágenes, íconos y narrativa educativa

Secciones modulares: Nosotros, Contacto, Oferta Académica

Layout fijo con Navbar y Footer institucionales

Redirección automática según rol (admin, docente, estudiante)

Integración con backend Render usando variables de entorno

📬 Contacto
Para dudas, sugerencias o colaboraciones:

📧 contacto@colegiomarti.edu.ve

📍 Caracas, Venezuela

📄 Licencia
Este proyecto es propiedad del Colegio José Martí. Su uso está limitado a fines educativos y de desarrollo institucional.

Código

---
```
