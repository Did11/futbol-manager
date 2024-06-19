# Challenge-Promises
Ejercicio: Gestión de equipo de fútbol. Desarrolla una aplicación para gestionar un equipo de fútbol, que permita realizar operaciones como agregar jugadores, listar jugadores, asignar posiciones y realizar cambios durante un partido. Utiliza promesas, async/await, try/catch y composición de funciones asíncronas para manejar las operaciones de forma segura y eficiente.

# Requisitos
1) La aplicación debe permitir agregar nuevos jugadores al equipo proporcionando su nombre, edad y posición.
2) Debe ser posible listar todos los jugadores del equipo, indicando su nombre, edad y posición.
3) Implementa un mecanismo para asignar posiciones a los jugadores, como delantero, centrocampista, defensa o portero.
4) Proporciona una función para realizar cambios durante un partido, que permita sustituir jugadores de acuerdo a las reglas del fútbol.
5) Utiliza un almacenamiento persistente para los datos del equipo y los jugadores, como una base de datos simple (puede ser simulado con archivos en el sistema de archivos).
6) Maneja los errores de manera adecuada utilizando try/catch para capturar errores asíncronos y promesas rechazadas.


# Características del Proyecto

- **Interfaz de Usuario**:
  - Un formulario para agregar jugadores con nombre, edad y posición.
  - Listas separadas para titulares y suplentes, con capacidad para mostrar la información de cada jugador.
  - Formularios para cambiar la posición de un jugador y para realizar sustituciones durante un partido.
- **Almacenamiento en `localStorage`**:
  - Los datos de los jugadores se guardan en `localStorage` para mantener la persistencia incluso después de recargar la página.
- **Posiciones de los Jugadores**:
  - Las posiciones están predefinidas y se cargan desde un objeto embebido. 
- **Manejo de Errores**:
  - Utiliza bloques try/catch para manejar errores asíncronos y promesas rechazadas.