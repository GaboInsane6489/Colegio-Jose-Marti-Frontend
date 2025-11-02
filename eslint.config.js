import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'build', 'coverage']),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern:
            '^(React|Suspense|getCookie|storedRole|StrictMode|Navigate|useLocation|motion|AnimatePresence|LayoutGroup|Navbar.*|Footer|ToastFeedback|VideoFondo.*|Encabezado.*|Seccion.*|Resumen.*|Filtros.*|Acciones.*|Nota.*|Curso.*|Perfil.*|Actividad.*|Entregas.*|ListaNotas|LandingContent|AnimatedSection|Component|Interaction.*|Trigger.*|Router|Routes|Route|MainLayout|DashboardLayout|Sidebar|Header|Home|About|Contact|AuthPage|LoginPage|RegisterPage|AdminDashboard|EstudianteDashboard|DocenteDashboard|BandejaNotificaciones|NotificacionesPage|CompromisoComunidad|DocentesTable|DocenteForm|ConfirmDialog|EstadisticasPanel|AuthWrapper|Particles|NotificacionesDocente|PanelResumenEstudiante|PendientesList|ConfiguracionPanel|UsuariosTable|DocentesManager|MisionVisionValores|LineaTiempoInstitucional|ModeloPedagogico|MateriasSection|App|HistoriaInicio|HistoriaTransformacion|HistoriaLegado|LoginForm|RegisterForm|GraficoActividad|DashboardActividadComparativo|ClaseCard|ResponsiveContainer|ClasesList|LineChart|Line|XAxis|YAxis|Tooltip|CartesianGrid|InputField|Bar|actividadId|err|Fa[A-Z].*|.*Icon|Link|role|cargando|_.*|error)$',
          argsIgnorePattern: '^_',
        },
      ],
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-undef': ['warn', { allowGlobals: true }],
      'no-inner-declarations': ['warn', 'functions'],
      'react/no-unused-prop-types': 'off',
      'no-duplicate-imports': 'warn',
      'no-shadow': 'warn',
    },
  },
]);
