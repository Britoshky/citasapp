# citasApp

citasApp es una aplicación híbrida diseñada para gestionar citas motivacionales o inspiradoras. Permite a los usuarios agregar, listar, eliminar y visualizar citas aleatorias con funcionalidades avanzadas como persistencia de datos local, paginación y configuraciones personalizables. Todo esto en una interfaz moderna y responsiva.

## Funcionalidades Principales

- **Gestín de Citas**: Los usuarios pueden agregar nuevas citas indicando frase y autor. Estas se muestran en una lista con funcionalidad de eliminación. Si el número de citas supera las 5, se activa una paginación automática.
- **Visualización Aleatoria**: La aplicación muestra citas aleatorias, las cuales cambian automáticamente cada 5 segundos.
- **Configuraciones**: Incluye una opción para habilitar o deshabilitar la funcionalidad de eliminar citas directamente desde la vista aleatoria.
- **Persistencia de Datos**: Todas las citas y configuraciones se almacenan localmente utilizando SQLite, garantizando que la información se mantenga disponible incluso después de cerrar la aplicación.
- **Interfaz Moderna**: La aplicación utiliza Ionic para ofrecer una experiencia visual atractiva y funcional en múltiples plataformas.

## Requisitos de Instalación

Para utilizar QuotesApp, necesitas cumplir con los siguientes requisitos previos:

1. Tener instalado **Node.js** (v16 o superior).
2. Tener instalado **Ionic CLI**:
   ```bash
   npm install -g @ionic/cli
   ```
3. Tener instalado **Capacitor CLI**:
   ```bash
   npm install -g @capacitor/cli
   ```

## Instalación y Configuración

1. **Clonar el Repositorio**: Descarga el proyecto desde el repositorio oficial.
2. **Instalar Dependencias**: Ejecuta `npm install` para instalar todas las dependencias necesarias.
3. **Sincronizar Capacitor**: Asegúrate de que Capacitor esté sincronizado con las plataformas mediante `npx cap sync`.
4. **Ejecutar en el Navegador**: Para probar la aplicación en un navegador, utiliza `ionic serve`.
5. **Ejecutar en Dispositivos Móviles**:
   - Para Android: Ejecuta `npx cap open android`.
   - Para iOS: Ejecuta `npx cap open ios`.

## Cómo Usar la Aplicación

### Gestión de Citas

- **Agregar Citas**: Accede a la página "Gestión de Citas", llena el formulario con la frase y el autor, y presiona "Agregar". Las citas se añaden a una lista que se paginará automáticamente si supera las 5 citas.
- **Eliminar Citas**: Cada cita tiene un botón de eliminación representado por un ícono de papelera roja.

### Visualización Aleatoria

- En el menú lateral, selecciona la opción "Cita Aleatoria". Aquí se mostrarán citas aleatorias que cambian cada 5 segundos.
- Si la funcionalidad está habilitada, podrás eliminar la cita actual.

### Configuración

- Ve a la sección "Configuración" en el menú lateral.
- Activa o desactiva la opción "¿Desea poder borrar citas en el inicio?" mediante un interruptor.

## Características Técnicas

citasApp está diseñada para ser una solución robusta y eficiente, implementando las siguientes características:

- **Persistencia Local**: Utiliza SQLite para almacenar todas las citas localmente, garantizando su disponibilidad incluso sin conexión a internet.
- **Validación de Formularios**: Los formularios verifican en tiempo real que los datos ingresados cumplan con los requisitos establecidos.
- **Paginación Automática**: Si el número de citas supera las 5, se habilitan botones para navegar entre las páginas.
- **Comunicación entre Componentes**: La aplicación utiliza `@Input` y `@Output` para manejar la interacción entre los diferentes componentes.
- **Compatibilidad Multiplataforma**: Funciona en navegadores web, dispositivos Android y iOS gracias a Capacitor e Ionic.

## Reflexión Final

El desarrollo de QuotesApp presentó desafíos interesantes. Inicialmente, se presentaron problemas en la integración de SQLite y en la comunicación entre componentes mediante `@Input` y `@Output`. Sin embargo, gracias a un enfoque estructurado y buenas prácticas de desarrollo, estos problemas fueron resueltos.  

Una mejora futura sería la implementación de funcionalidad para editar citas y la sincronización de datos en la nube, asegurando un acceso universal a las citas independientemente del dispositivo utilizado. El proyecto actual es funcional, escalable y fácil de mantener.

citasApp representa un esfuerzo dedicado para ofrecer una experiencia de usuario sólida, eficiente y estéticamente atractiva.

