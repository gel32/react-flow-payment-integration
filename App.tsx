/*
import { lazy, Suspense, LazyExoticComponent, ComponentType } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Utility para carga perezosa
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyWithPreload = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): LazyExoticComponent<T> & { preload: () => Promise<void> } => {
  const Component = lazy(factory);
  return Object.assign(Component, {
    preload: () => factory().then(() => {})
  });
};

// --- COMPONENTES SHARED (Rutas corregidas con ../) ---
const WhatsAppButton = lazy(() => import('/Users/luisfe/Documents/Inge - Nueva web/src/ui-public/components/utilities/WhatsAppButton.tsx'));
const ScrollToTop = lazy(() => import('/Users/luisfe/Documents/Inge - Nueva web/src/ui-public/components/utilities/ScrollToTop.tsx'));

// --- PÁGINAS (Rutas corregidas) ---
// Inicio está en la misma carpeta ui-public/pages
const Inicio = lazyWithPreload(() => import('/Users/luisfe/Documents/Inge - Nueva web/src/ui-public/pages/Inicio')); 

// ResultadoGarantia está en ui-private/pages, subimos un nivel
const ResultadoGarantia = lazyWithPreload(() => import('/Users/luisfe/Documents/Inge - Nueva web/src/ui-private/pages/ResultadoGarantia.tsx'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Suspense fallback={<div>Cargando...</div>}><Inicio /></Suspense>} />
          
          <Route path="/garantias/resultado" element={
            <Suspense fallback={<div className="p-20 text-center">Confirmando pago...</div>}>
              <ResultadoGarantia />
            </Suspense>
          } />

          <Route path="*" element={<div>404 - No encontrado</div>} />
        </Routes> 
      </main>

      <WhatsAppButton />
    </Router>
  );
}

export default App;
*/

import { lazy, Suspense, LazyExoticComponent, ComponentType } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Utility para carga perezosa
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyWithPreload = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): LazyExoticComponent<T> & { preload: () => Promise<void> } => {
  const Component = lazy(factory);
  return Object.assign(Component, {
    preload: () => factory().then(() => {})
  });
};

// --- COMPONENTES SHARED (Rutas Relativas) ---
// Salimos de ui-public hacia src, y entramos a shared
//const WhatsAppButton = lazy(() => import('../shared/components/utilities/WhatsAppButton'));
const WhatsAppButton = lazy(() => import('./ui-public/components/utilities/WhatsAppButton'));
const ScrollToTop = lazy(() => import('./ui-public/components/utilities/ScrollToTop'));

// --- PÁGINAS PÚBLICAS (Misma carpeta ui-public) ---
const Inicio = lazyWithPreload(() => import('./ui-public/pages/Inicio')); 

// --- PÁGINAS PRIVADAS (Rutas Relativas) ---
// Salimos de ui-public hacia src, y entramos a ui-private
const ResultadoGarantia = lazyWithPreload(() => import('./ui-private/pages/ResultadoGarantia'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<div>Cargando...</div>}>
              <Inicio />
            </Suspense>
          } />
          
          {/* RUTA DE RESULTADO */}
          <Route path="/garantias/resultado" element={
            <Suspense fallback={<div className="p-20 text-center">Confirmando pago...</div>}>
              <ResultadoGarantia />
            </Suspense>
          } />

          <Route path="*" element={<div>404 - No encontrado</div>} />
        </Routes> 
      </main>

      <WhatsAppButton />
    </Router>
  );
}

export default App;