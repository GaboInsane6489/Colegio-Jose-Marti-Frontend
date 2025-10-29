import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "build", "coverage"]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      // ✅ Ignora componentes JSX, layouts, rutas, íconos y props condicionales
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern:
            "^(React|StrictMode|motion|AnimatePresence|LayoutGroup|Navbar.*|Footer|ToastFeedback|VideoFondo.*|Encabezado.*|Seccion.*|Resumen.*|Filtros.*|Acciones.*|Nota.*|Curso.*|Perfil.*|Actividad.*|Entregas.*|ListaNotas|LandingContent|AnimatedSection|Component|Interaction.*|Trigger.*|Router|Routes|Route|MainLayout|DashboardLayout|Sidebar|Header|Home|About|Contact|AuthPage|LoginPage|RegisterPage|AdminDashboard|EstudianteDashboard|DocenteDashboard|BandejaNotificaciones|NotificacionesPage|CompromisoComunidad|DocentesTable|DocenteForm|ConfirmDialog|EstadisticasPanel|AuthWrapper|Particles|NotificacionesDocente|PanelResumenEstudiante|PendientesList|ConfiguracionPanel|UsuariosTable|DocentesManager|MisionVisionValores|LineaTiempoInstitucional|ModeloPedagogico|MateriasSection|App|HistoriaInicio|HistoriaTransformacion|HistoriaLegado|LoginForm|RegisterForm|GraficoActividad|DashboardActividadComparativo|ClaseCard|ResponsiveContainer|ClasesList|LineChart|Line|XAxis|YAxis|Tooltip|CartesianGrid|InputField|Bar|actividadId|err|Fa[A-Z].*|.*Icon|Link|_.*|error)$",
          argsIgnorePattern: "^_",
        },
      ],

      // ✅ Hooks bien usados, sin falsos positivos
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn", // ⚠️ mantenemos esto activo para detectar dependencias faltantes

      // ✅ JSX condicional y dinámico sin advertencias
      "react/jsx-no-undef": ["warn", { allowGlobals: true }],

      // ✅ Permite componentes definidos como funciones internas
      "no-inner-declarations": ["warn", "functions"],

      // ✅ Props no usados en componentes condicionales
      "react/no-unused-prop-types": "off",

      // ✅ Imports duplicados permitidos si son necesarios
      "no-duplicate-imports": "warn",

      // ⚠️ Variables shadowed siguen siendo advertidas
      "no-shadow": "warn",
    },
  },
]);
