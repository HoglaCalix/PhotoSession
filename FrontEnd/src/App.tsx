// src/App.tsx
import { SessionCard , type SessionCardProps } from './Components/SessionCards';
import { useState, useEffect } from 'react';

function App() {

  const [sessions, setSessions] = useState<SessionCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      const fetchedSessions: SessionCardProps[] = [
        { id: 1, nombre: 'Retrato Corporativo en Estudio' },
        { id: 2, nombre: 'Sesión de Producto — E-commerce' },
        { id: 3, nombre: 'Boda al Aire Libre (Golden Hour)' },
      ];
      setSessions(fetchedSessions);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredSessions = sessions.filter(session =>
    session.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row relative overflow-hidden">
      {/* --- Halos decorativos globales (rojo + blanco para el glass) --- */}
      <div className="pointer-events-none fixed top-0 left-0 h-96 w-96 rounded-full bg-red-700/15 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-96 w-96 rounded-full bg-rose-800/15 blur-3xl" />
      <div className="pointer-events-none fixed top-1/3 right-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      {/* =====================================================================
          1. SIDEBAR — GLASS
         ===================================================================== */}
      <aside className="hidden md:flex md:w-64 md:flex-col
                        bg-white/5 backdrop-blur-2xl
                        border-r border-white/10
                        justify-between p-5 shrink-0 relative z-10
                        shadow-2xl shadow-black/40">
        <div>
          {/* Logo cristal (rojo translúcido) */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white
                            bg-gradient-to-br from-red-500/80 to-rose-700/80
                            border border-white/20 backdrop-blur-md
                            shadow-lg shadow-red-900/50
                            before:absolute before:inset-x-0 before:top-0 before:h-px
                            before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent">
              LS
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Lumina Studio</span>
          </div>

          {/* Navegación — GLASS */}
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm
                                  bg-red-500/15 text-red-300
                                  border border-red-500/30 backdrop-blur-sm
                                  shadow-inner shadow-red-900/20">
              <span></span> Galería de Sesiones
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm
                                  text-white/40 cursor-not-allowed border border-transparent">
              <span></span> Mis Reservas (Unidad 3)
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm
                                  text-white/40 cursor-not-allowed border border-transparent">
              <span></span> Portafolio (Unidad 3)
            </a>
          </nav>
        </div>

        {/* Estado de Sesión — GLASS */}
        <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10
                        shadow-inner shadow-black/30">
          <p className="text-xs text-white/50 mb-1">Estado de la Sesión</p>
          <p className="text-sm font-semibold text-red-400">Modo Invitado</p>
        </div>
      </aside>

      {/* =====================================================================
          2. HEADER MÓVIL — GLASS
         ===================================================================== */}
      <header className="md:hidden bg-black/60 backdrop-blur-xl border-b border-white/10
                         p-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white
                          bg-gradient-to-br from-red-500/80 to-rose-700/80
                          border border-white/20 backdrop-blur-md
                          shadow-md shadow-red-900/50
                          before:absolute before:inset-x-0 before:top-0 before:h-px
                          before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent">
            LS
          </div>
          <span className="font-bold text-lg text-white">Lumina Studio</span>
        </div>
        <span className="text-xs bg-red-500/15 text-red-300 px-2.5 py-1 rounded-md
                         border border-red-500/30 backdrop-blur-sm font-medium">
           Invitado
        </span>
      </header>

      {/* =====================================================================
          3. WORKSPACE
         ===================================================================== */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative z-10">

        {/* Título + Botón principal (GLASS ROJO) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Galería de Sesiones Fotográficas</h1>
            <p className="text-neutral-400 text-sm mt-1">
              Explora las sesiones registradas en la tabla <code className="text-red-400 font-mono">Sesiones</code>.
            </p>
          </div>

          <button className="relative self-start sm:self-auto
                             text-white font-semibold text-sm px-5 py-2.5 rounded-xl
                             bg-red-600/80 backdrop-blur-md
                             border border-white/20
                             shadow-lg shadow-red-900/50
                             hover:bg-red-500/90 hover:border-white/30
                             transition-all cursor-pointer
                             before:absolute before:inset-x-0 before:top-0 before:h-px
                             before:rounded-t-xl before:bg-gradient-to-r
                             before:from-transparent before:via-white/60 before:to-transparent">
            + Nueva Sesión
          </button>
        </div>

        {/* Buscador (GLASS) */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <input
            type="text"
            placeholder=" Filtrar sesiones en el catálogo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-md bg-white/5 backdrop-blur-md
                       border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white
                       placeholder-white/40 focus:outline-none focus:border-red-500/50
                       focus:bg-white/[0.07] transition-all"
          />
          <span className="text-xs text-neutral-400">
            Mostrando <strong className="text-white">{filteredSessions.length}</strong> de {sessions.length} registros en memoria
          </span>
        </div>

        {/* Renderizado condicional (GLASS loader rojo) */}
        {loading ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center
                          shadow-lg shadow-black/40">
            <p className="text-red-400 font-semibold animate-pulse text-lg">
              Sincronizando catálogo desde el Almacén de Estado...
            </p>
            <p className="text-white/40 text-xs mt-2">
              Ejecutando Vuelta 1 (Montaje inicial y disparo de useEffect)
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSessions.map((session) => (
              <SessionCard 
                key={session.id} 
                id={session.id} 
                nombre={session.nombre} 
              />
            ))}
          </section>
        )}

      </main>
    </div>
  )
}

export default App