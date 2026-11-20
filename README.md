# Pasarela de pago Flow - React & TypeScript

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📝 Descripción
Este componente es una solución robusta para la gestión y visualización de resultados de transacciones a través de la pasarela de pagos **Flow**. Está diseñado para integrarse en flujos de eCommerce o plataformas de servicios (como sistemas de garantías), ofreciendo una experiencia de usuario clara y profesional tras completar un pago.

## 🚀 Características Clave
* **Integración de API REST:** Consumo asíncrono de endpoints para verificar el estado real de la transacción mediante tokens dinámicos.
* **Tipado Estricto:** Uso de interfaces en TypeScript para asegurar la integridad de los datos financieros recibidos (Monto, Orden, Pagador, etc.).
* **Diseño UI/UX con Tailwind:** Interfaz moderna y minimalista, optimizada para móviles, con estados visuales diferenciados para éxito y error.
* **Manejo de Estados:** Control de ciclos de vida (`loading`, `success`, `error`) para evitar parpadeos visuales y mejorar la percepción de velocidad.
* **Formateo de Moneda:** Implementación de `toLocaleString` para presentar montos en Pesos Chilenos (CLP) de forma legible.

## 🛠️ Tecnologías Utilizadas
* **React 18** (Functional Components & Hooks)
* **TypeScript** (Seguridad de tipos y escalabilidad)
* **React Router Dom v6** (Gestión de parámetros de URL y navegación)
* **Tailwind CSS** (Estilizado responsivo y utilitario)

## 📦 Estructura del Componente
El componente principal `ResultadoGarantia.tsx` se encarga de:
1.  Capturar el `token` enviado por Flow desde la URL.
2.  Realizar el `fetch` al backend encargado de la validación.
3.  Renderizar un comprobante visual con los detalles de la orden para el cliente final.

## 💻 Ejemplo de Uso
Para visualizar el resultado, el sistema espera una URL con la siguiente estructura:
`http://localhost:5173/garantias/resultado?token=[TOKEN_DE_FLOW]`

---
*Este proyecto forma parte de mi portafolio como Desarrollador Full-Stack*
