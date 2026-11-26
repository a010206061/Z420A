# Z420A · Otra Perspectiva — Mapa Inclusivo CDMX

**Reto 2 · Ciudad para todas y todos (ODS 11: Ciudades y comunidades sostenibles)**

## 🌐 Aplicación Demostrable en Vivo
👉 **[Abrir Prototipo Interactivo Z420A](https://a010206061.github.io/Z420A/)**

---

## 🎯 Descripción del Proyecto
**Z420A (ZONA) · Otra Perspectiva** es una plataforma web interactiva de movilidad y accesibilidad urbana diseñada para la Ciudad de México. Permite visualizar en tiempo real corredores seguros, infraestructura accesible y barreras urbanas mediante un enfoque centrado en las distintas necesidades de las personas peatones.

## ✨ Funcionalidades Principales del MVP
* **7 Perspectivas Urbanas Interactivas:** Filtros especializados para *Zonas Seguras*, *Alertas (3 Niveles)*, *Movilidad (Silla de ruedas)*, *Perros Guía*, *Sensorial / Adulto Mayor*, *Puntos de Auxilio C5* y *Puntos 4:20*.
* **Jerarquía Visual de 4 Niveles:** Clasificación clara mediante código de color e iconos (*Segura*, *Precaución Leve*, *Alerta Moderada* y *Peligro Crítico*).
* **Accesibilidad Nativa:** Incluye modo **Daltonismo** (paleta adaptada Okabe-Ito), modo **Alto Contraste**, escalado dinámico de tipografía (`A+`) y **lectura en voz alta** (*Text-to-Speech*) de cada diagnóstico.
* **Visor de Auditoría Urbana con Gemini Vision:** Escaneo en vivo de fotografías de la vía pública para clasificar automáticamente el nivel de riesgo o accesibilidad y generar propuestas urbanas.

## 📂 Estructura del Repositorio
* `index.html` — Aplicación web completa (interfaz responsiva, mapa interactivo Leaflet, motor de accesibilidad y conexión con Gemini Vision API).
* `README.md` — Documentación del proyecto y enlace a la demo desplegada.

## 🛠️ Tecnologías Utilizadas
* **Frontend:** HTML5, CSS3 (Diseño responsivo y variables adaptativas), JavaScript (ES6+).
* **Cartografía:** Leaflet.js + Esri World Street Map.
* **Inteligencia Artificial:** Google Gemini 2.5 Flash API (Visión y clasificación urbana).
* **Despliegue:** GitHub Pages.
