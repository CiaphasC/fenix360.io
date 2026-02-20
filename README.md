# FENIX360

Landing page premium de consultoria y mentoria ejecutiva, construida con React + Vite.

## Que hace la pagina

- Presenta la marca FENIX360 con una experiencia visual cinematica.
- Muestra secciones clave: Hero, Mentoria, Consultoria, Manifiesto y cierre (Quote + Footer).
- Incluye animaciones de entrada y scroll con GSAP.
- Usa fondos y particulas en Three.js para dar profundidad visual.
- Soporta navegacion interna por anclas con scroll inteligente (incluyendo secciones horizontales en desktop).
- Es responsive: comportamiento adaptado para desktop, tablet y movil.

## Tecnologias usadas

- React 19
- TypeScript 5
- Vite 6
- Tailwind CSS 3
- GSAP + ScrollTrigger
- Three.js
- Lucide React (iconos)
- ESLint (linting)

## Caracteristicas tecnicas destacadas

- Animacion de intro con cortina (`CurtainOverlay`).
- Hero con particulas interactivas:
- En desktop responde a cursor.
- En movil/tablet responde a touch y giroscopio con suavizado.
- Seccion horizontal en desktop (`HorizontalScrollSection`) para Consultoria y Manifiesto.
- En movil, ese bloque pasa a flujo vertical normal.
- Sistema de componentes reutilizables para reveals/parallax (`GsapReveal`, `GsapParallax`).
- Alias `@` hacia `src` configurado en Vite.

## Estructura del proyecto

```text
src/
  app/
    App.tsx
  components/
    layout/
    sections/
    three/
    ui/
    icons/
  hooks/
  data/
  styles/
  types/
  utils/
```

## Requisitos

- Node.js 18 o superior (recomendado Node 20+)
- npm 9 o superior

## Scripts disponibles

- `npm run dev`: inicia entorno de desarrollo con Vite.
- `npm run build`: typecheck por proyecto (`tsc -b`) + build de produccion.
- `npm run preview`: sirve build local para validacion.
- `npm run typecheck`: valida tipos sin emitir.
- `npm run lint`: ejecuta ESLint en `ts` y `tsx`.

## Como ejecutar localmente

1. Instala dependencias:

```bash
npm install
```

2. Inicia desarrollo:

```bash
npm run dev
```

3. Compila para produccion:

```bash
npm run build
```

## Deploy

- El proyecto esta preparado para deploy en Vercel.
- Para evitar errores de TypeScript en build remoto, los tipos de Three.js deben estar en `devDependencies`.

