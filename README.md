# Hola, soy Alejandra estudiante Front-End! 😎

# 👽🛸 Proyecto Integrador: Rick y Morty API

## 📑 Descripcion general:
Este proyecto es una aplicación web que consume la API pública de Rick and Morty, permitiendo explorar personajes con una interfaz amigable, responsiva y con cambio de tema (modo claro/oscuro).
Está desarrollado completamente con HTML, CSS y JavaScript Vanilla, sin frameworks.

## Screenshots

![App Screenshot](https://github.com/alejaagf/Rick-and-Morty-API-Project/blob/1c6419de9e6489e4398f06fafa4b6e81574713f0/Screenshot%202025-11-29%20172841.png)
![App Screenshot](https://github.com/alejaagf/Rick-and-Morty-API-Project/blob/1c6419de9e6489e4398f06fafa4b6e81574713f0/Screenshot%202025-11-29%20172831.png)

## 🛠️ Tecnologías utilizadas

• HTML5

• CSS3 (Flexbox)

• JavaScript Vanilla

## 🧾 Caracteristicas

🎨 Modo claro y oscuro
El usuario puede alternar entre ambos temas.
Las preferencias se guardan automáticamente usando LocalStorage.

📱 Diseño responsivo
La interfaz está maquetada usando Flexbox, adaptándose a dispositivos móviles, tablets y escritorio.

🔍 Consumo de API
Se obtiene información directamente de la API de Rick and Morty para mostrar personajes, estados, especies, imágenes y más.

⚡ JavaScript Vanilla
Toda la lógica está desarrollada sin librerías externas.

## 🌙 Modo claro/oscuro

El proyecto detecta y guarda el tema seleccionado por el usuario:
Si el usuario cambia de modo, se almacena en localStorage.
Al recargar la página, se restaura el tema previamente elegido.

## 🧩 Problemas encontrados & Aprendizajes

Durante el desarrollo del proyecto surgieron varios desafíos que me ayudaron a mejorar mis habilidades:

## 1. LocalStorage y persistencia de datos

Al principio no sabía qué era LocalStorage ni cómo funcionaba.
Aprendí que permite guardar datos en el navegador incluso después de cerrar o recargar la página.
Gracias a eso implementé la persistencia del modo claro/oscuro.


## 2. El modo oscuro se reiniciaba al refrescar la página

Inicialmente, cada vez que actualizaba la página, el modo oscuro se perdía.
Después de investigar entendí que debía leer el valor almacenado en LocalStorage al iniciar la app y aplicarlo antes de renderizar la interfaz.
Esto resolvió el problema y permitió que las preferencias del usuario se mantuvieran.

## 3. Entender los endpoints de la API

No tenía claro cómo funcionaban los endpoints ni cómo estructurar las llamadas.
Explorando la documentación aprendí:

Qué es un endpoint

Cómo enviar una petición

Cómo manejar la respuesta

Cómo navegar entre páginas de datos (paginación)

Esto me permitió integrar correctamente los personajes de la API en la interfaz.

## 🔗 API utilizada
Rick and Morty API
https://rickandmortyapi.com/

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alejagf/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/fukiori._/)
[![TikTok](https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://www.tiktok.com/@fukiori._)
