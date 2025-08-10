# DianaPower 🏋️‍♀️

**Tu Coach Personal de Powerlifting**

DianaPower es una aplicación web progresiva diseñada específicamente para entrenamientos de powerlifting, enfocada en los tres movimientos principales: sentadillas, peso muerto y press de banca. La aplicación combina registro de rutinas, comunicación con coach virtual y grabación de ejercicios en una interfaz moderna y fácil de usar.

![DianaPower](https://img.shields.io/badge/DianaPower-v1.0.0-red?style=for-the-badge&logo=react)

## ✨ Características Principales

### 🏋️ **Registro de Rutinas**
- ✅ Formularios intuitivos con dropdowns para ejercicios
- ✅ Selección de series (1-10) y repeticiones (1-15) 
- ✅ Registro de pesos objetivo vs reales con incrementos de 0.5kg
- ✅ Campo de notas para observaciones personalizadas
- ✅ Separación entre entrenamiento del día e histórico

### 📊 **Historial Completo**
- ✅ Vista cronológica de todos los entrenamientos
- ✅ Agrupación automática por fechas
- ✅ Estadísticas de progreso visual
- ✅ Persistencia local de datos

### 💬 **Coach Virtual**
- ✅ Chat interactivo con respuestas motivacionales
- ✅ Consejos específicos de powerlifting
- ✅ Mensajes personalizados y contextual
- ✅ Historial de conversaciones persistente

### 📹 **Grabación de Ejercicios**
- ✅ Grabación de video en tiempo real
- ✅ Almacenamiento local en IndexedDB
- ✅ Reproducción y gestión de videos guardados
- ✅ Interfaz optimizada para móviles

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Base de Datos**: IndexedDB (via Dexie)
- **Almacenamiento**: localStorage + IndexedDB
- **Tabla**: TanStack React Table
- **Video**: React Webcam
- **Fechas**: date-fns
- **IDs**: uuid

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/diana-power.git
cd diana-power

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Build para Producción
```bash
# Generar build optimizado
npm run build

# Previsualizar build
npm run preview
```

## 📱 Uso de la Aplicación

### 1. **Pestaña Rutina**
1. Haz clic en "**+ Agregar Set**" para crear un nuevo conjunto
2. Selecciona el **ejercicio** desde el dropdown (Sentadillas, Peso muerto, Press de banca)
3. Configura **series** y **repeticiones objetivo**
4. Establece el **peso objetivo** en kg
5. Durante/después del ejercicio, completa **repeticiones** y **peso real**
6. Añade **notas** opcionales (técnica, sensaciones, etc.)
7. Usa "**📈 Histórico**" para revisar entrenamientos pasados

### 2. **Pestaña Chat**
1. Escribe mensajes a tu coach virtual
2. Recibe consejos motivacionales y técnicos
3. Las conversaciones se guardan automáticamente

### 3. **Pestaña Vídeo**
1. Haz clic en "**⏺️ Iniciar Grabación**" para comenzar
2. Realiza tu ejercicio frente a la cámara
3. Presiona "**⏹️ Detener Grabación**" al finalizar
4. Guarda el video con "**💾 Guardar Video**"
5. Accede a "**Ver Videos**" para revisar grabaciones anteriores

## 🎯 Casos de Uso

### Para Deportistas
- Registro detallado de sesiones de entrenamiento
- Seguimiento de progreso en los tres movimientos principales
- Análisis de técnica mediante grabaciones
- Motivación constante a través del coach virtual

### Para Entrenadores
- Herramienta de seguimiento para atletas
- Revisión de videos de técnica
- Historial completo de entrenamientos
- Comunicación asíncrona con deportistas

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con HMR

# Producción  
npm run build        # Build optimizado para producción
npm run preview      # Previsualizar build de producción

# Calidad de Código
npm run lint         # Ejecutar ESLint
npx tsc --noEmit    # Verificación de tipos TypeScript
```

## 📊 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── WorkoutSheet.tsx # Registro de rutinas
│   ├── ChatBox.tsx      # Chat con coach
│   ├── CameraRecorder.tsx # Grabación de video
│   └── VideoList.tsx    # Lista de videos guardados
├── hooks/               # Custom hooks
│   ├── useLocalStorage.ts # Persistencia localStorage
│   └── useIndexedDB.ts   # Gestión IndexedDB
├── types/               # Definiciones TypeScript
│   └── index.ts         # Interfaces principales
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 🎨 Diseño y UI/UX

### Tema Visual
- **Colores**: Paleta negro/rojo/gris con acentos dorados
- **Tipografía**: Inter (moderna y legible)
- **Iconografía**: Emojis y símbolos descriptivos
- **Layout**: Mobile-first con navegación por pestañas

### Experiencia de Usuario
- **Persistencia**: Todos los datos se guardan automáticamente
- **Responsive**: Optimizado para móviles y desktop
- **Accesibilidad**: Contraste alto y navegación intuitiva
- **Performance**: Carga rápida y transiciones suaves

## 🔐 Privacidad y Datos

- **Almacenamiento Local**: Todos los datos permanecen en el dispositivo
- **Sin Servidor**: No se envía información a servidores externos
- **IndexedDB**: Videos y datos estructurados almacenados localmente
- **localStorage**: Configuraciones y datos simples

## 🐛 Solución de Problemas

### Problemas Comunes

**La cámara no funciona:**
- Verifica permisos de cámara en el navegador
- Usa HTTPS o localhost para acceso a cámara
- Reinicia el navegador si es necesario

**Los datos no se guardan:**
- Verifica que localStorage esté habilitado
- Comprueba espacio disponible en el dispositivo
- No uses modo incógnito para sesiones largas

**Videos no se reproducen:**
- Verifica compatibilidad del formato WebM
- Comprueba espacio en IndexedDB
- Borra videos antiguos si es necesario

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar tests de tipos
npx tsc --noEmit

# Verificar linting
npm run lint

# Verificar build
npm run build
```

## 📝 Licencia

Este proyecto está bajo la Licencia GNU General Public License v3.0 - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Desarrollado con ❤️ para la comunidad de Powerlifting**

---

## 🔮 Roadmap Futuro

- [ ] 📈 Gráficos de progreso con Chart.js
- [ ] 🔄 Sincronización en la nube (opcional)
- [ ] 📋 Plantillas de rutinas predefinidas
- [ ] ⏱️ Temporizador de descanso entre series
- [ ] 🏆 Sistema de logros y medallas
- [ ] 📊 Análisis de frecuencia de entrenamiento
- [ ] 🎯 Calculadora de 1RM automática
- [ ] 📱 PWA con instalación offline

---

**DianaPower** - Desarrollando la fuerza, una repetición a la vez 💪👑
