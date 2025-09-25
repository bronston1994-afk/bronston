# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a fire alarm system (АПС) equipment calculator built with React and Vite. The project includes:
- A React-based calculator app that calculates fire safety equipment requirements
- A standalone HTML version of the same calculator (`aps-equipment.html`)
- Modern development tooling with Vite, ESLint, and TypeScript support

## Development Commands

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

- `src/` - React application source code
  - `main.jsx` - Application entry point
  - `App.jsx` - Main calculator component with fire safety equipment calculations
  - `App.css` / `index.css` - Component and global styles
- `aps-equipment.html` - Standalone HTML version with embedded CSS and JavaScript
- `index.html` - Vite HTML template
- `vite.config.js` - Vite configuration
- `eslint.config.js` - ESLint configuration

## Architecture Notes

### Calculator Logic
Both the React and HTML versions implement the same fire safety equipment calculation logic:
- Detector calculations based on coverage area and building type
- Smoke/heat detector ratios vary by building type (office: 80/20, warehouse: 30/70, industrial: 40/60)
- Zone calculations for control panels (1 per 4 zones minimum)
- Cable length calculations with configurable reserve percentage
- Manual call point positioning based on perimeter and room count

### Styling Approach
- React version uses inline styles with CSS-in-JS approach
- HTML version uses traditional CSS classes
- Both feature gradient backgrounds and modern card-based layouts
- Responsive design with CSS Grid

## Language Requirements

- **ВАЖНО: ВСЕ комментарии в коде должны быть написаны исключительно на русском языке**
- User interface text is in Russian as this is a specialized tool for Russian fire safety standards
- При написании любого кода всегда добавляйте русские комментарии для объяснения логики

## Code Conventions

- React components use functional components with hooks
- ESLint configured for React best practices with hooks plugin
- Unused variables allowed if they start with uppercase or underscore
- Modern ES6+ JavaScript with module imports