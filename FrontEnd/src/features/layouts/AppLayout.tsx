import type { ReactNode } from 'react';


interface AppLayoutProps {
  children: ReactNode;
}


export function AppLayout({ children }: AppLayoutProps) {
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
                  3. CONTENIDO PRINCIPAL — GLASS
                 ===================================================================== */}
              <main className="flex-1 p-6 md:p-8 lg:p-10 relative z-10">
                <div className="max-w-6xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          );
        }
