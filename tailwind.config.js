import { mtConfig } from '@material-tailwind/react';
// import scrollbar from 'tailwind-scrollbar'; // ❌ Temporalmente desactivado

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // 🎨 Paleta institucional
      colors: {
        primary: '#1a1a1a',
        text: '#ffffff',
        accent: '#e0b400',
      },
      // 🖋️ Tipografía institucional
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    mtConfig, // 🧩 Componentes de Material Tailwind
    // scrollbar({ nocompatible: true }), // ❌ Scrollbar estilizado desactivado
  ],
};
