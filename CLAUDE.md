# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Architecture

This is a React + TypeScript personal portfolio website built with Vite and Tailwind CSS. The project has a multi-page structure using Vite's multi-entry configuration.

### Project Structure

- **Main Site (`/`)**: Personal portfolio page (src/App.tsx)
- **Nomis App Landing (`/nomis/`)**: Product landing page for Nomis budget tracker app (src/nomis/NomisLanding.tsx)
- **Support Pages**: Privacy policy, terms of service, and support pages under `/nomis/`

### Key Technologies

- **React 19** with TypeScript
- **Vite** as build tool with SWC for fast refresh
- **Tailwind CSS v4** for styling
- **ESLint** with TypeScript rules and React plugins

### Multi-Entry Configuration

The Vite config defines multiple HTML entry points:
- `index.html` - Main portfolio
- `nomis/index.html` - Nomis landing page
- `nomis/support/index.html` - Support page
- `nomis/terms/index.html` - Terms page
- `nomis/privacy/index.html` - Privacy page

Each entry point has its own React app with separate main.tsx files.

### Static Assets

- Portfolio images and icons in `/public/`
- Nomis app assets in `/public/nomis/`
- Resume PDF in `/public/resume/`

## Development Notes

- Uses experience calculation utility (src/utils/experience.ts) for dynamic years display
- Optimized image loading with preloading strategies in Nomis landing page
- Responsive design with Tailwind utility classes
- Smooth scrolling navigation implemented with JavaScript