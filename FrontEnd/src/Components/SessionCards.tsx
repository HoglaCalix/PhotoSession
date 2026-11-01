// src/components/SessionCards.tsx

// --- ZONA 1: EL CONTRATO (INTERFAZ) ---
export interface SessionCardProps {
    id: number;
    nombre: string;
}

// --- ZONA 2: LA FIRMA (EXPORTACIÓN NOMBRADA) ---
export function SessionCard({ id, nombre }: SessionCardProps) {

    // --- ZONA 3: EL CEREBRO (LÓGICA) ---
    // (Vacío por los momentos, este componente es puramente presentacional)

    // --- ZONA 4: EL RENDERIZADO (JSX) ---
    return (
        <article className="relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between
                            bg-white/5 backdrop-blur-xl
                            border border-white/10
                            shadow-lg shadow-black/50
                            before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent
                            hover:border-red-500/40 hover:bg-white/[0.07] hover:shadow-red-900/30
                            transition-all">
            {/* Resplandor rojo difuso de fondo (efecto cristal interior) */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-red-600/25 blur-3xl" />

            <div className="relative">
                {/* Cabecera: Badge ID */}
                <div className="flex items-center justify-between mb-3">
                    <span className="bg-red-500/15 text-red-300 text-xs font-semibold px-2.5 py-1 rounded-md
                                     border border-red-500/30 backdrop-blur-sm">
                        ID Catálogo #{id}
                    </span>
                    <span className="text-xs text-white/50 font-medium">Catálogo Base</span>
                </div>

                {/* Nombre de la Sesión */}
                <h3 className="text-lg font-bold text-white mb-5 drop-shadow-sm">
                    {nombre}
                </h3>
            </div>

            {/* Botón (deshabilitado, glass) */}
            <button
                disabled
                className="relative w-full bg-white/5 text-white/40 text-sm font-medium py-2.5 px-4 rounded-lg
                           cursor-not-allowed border border-white/10 backdrop-blur-sm"
            >
                 Agendar Sesión (Requiere Sesión)
            </button>
        </article>
    );
}