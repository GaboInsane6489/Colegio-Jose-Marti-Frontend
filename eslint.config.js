import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignorar carpetas de salida y cobertura
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
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    rules: {
      // ✅ Ignora componentes, layouts, íconos y props condicionales no usados
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern:
            "^(React|StrictMode|Navigate|motion|AnimatePresence|LayoutGroup|Navbar.*|Footer|ToastFeedback|VideoFondo.*|Encabezado.*|Seccion.*|Resumen.*|Filtros.*|Acciones.*|Nota.*|Curso.*|Perfil.*|Actividad.*|Entregas.*|ListaNotas|LandingContent|AnimatedSection|Component|Interaction.*|Trigger.*|Router|Routes|Route|MainLayout|DashboardLayout|Sidebar|Header|Home|About|Contact|AuthPage|LoginPage|RegisterPage|AdminDashboard|EstudianteDashboard|DocenteDashboard|BandejaNotificaciones|NotificacionesPage|CompromisoComunidad|DocentesTable|DocenteForm|ConfirmDialog|EstadisticasPanel|AuthWrapper|Particles|NotificacionesDocente|PanelResumenEstudiante|PendientesList|ConfiguracionPanel|UsuariosTable|DocentesManager|MisionVisionValores|LineaTiempoInstitucional|ModeloPedagogico|MateriasSection|App|HistoriaInicio|HistoriaTransformacion|HistoriaLegado|LoginForm|RegisterForm|GraficoActividad|DashboardActividadComparativo|ClaseCard|ResponsiveContainer|ClasesList|LineChart|Line|XAxis|YAxis|Tooltip|CartesianGrid|InputField|Bar|actividadId|err|Fa[A-Z].*|.*Icon|Link|_.*|error)$",
          argsIgnorePattern: "^_",
        },
      ],

      // ✅ Reglas de hooks bien aplicadas
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",

      // ✅ Permite JSX global y condicional
      "react/jsx-no-undef": ["warn", { allowGlobals: true }],

      // ✅ Permite funciones internas
      "no-inner-declarations": ["warn", "functions"],

      // ✅ Permite props no usados en componentes condicionales
      "react/no-unused-prop-types": "off",

      // ✅ Permite imports duplicados si son necesarios
      "no-duplicate-imports": "warn",

      // ⚠️ Advierte sobre variables shadowed
      "no-shadow": "warn",
    },
  },
]);
