// src/components/SessionCards.tsx

import { useState } from 'react';
import type { Session } from '../types/sessions.types';
import { deleteSession, extractErrorMessages } from '../api/sessionsApi';

interface SessionCardProps extends Session {
    onDelete?: (id: number) => void;
    onEdit?: (session: Session) => void;
}

// --- ZONA 2: LA FIRMA (EXPORTACIÓN NOMBRADA) ---
export function SessionCard({ id, nombre, onDelete, onEdit }: SessionCardProps) {
    const [deleting, setDeleting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        // Confirmación nativa del navegador para evitar borrados accidentales
        const confirmado = window.confirm(`¿Eliminar la sesión "${nombre}" (ID #${id})?`);
        if (!confirmado) return;

        setDeleting(true);
        setError(null);

        try {
            await deleteSession(id);
            // Notificamos al padre para que actualice su estado sin re-fetch
            onDelete?.(id);
        } catch (err) {
            setError(extractErrorMessages(err));
            console.error('🚨 Error al eliminar la sesión desde .NET:', err);
        } finally {
            setDeleting(false);
        }
    };

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

                {/* Error de eliminación (respuesta exacta del backend) */}
                {error && (
                    <p className="mb-4 text-xs text-red-400 bg-red-950/40 border border-red-500/40 rounded-lg p-2">
                        {error}
                    </p>
                )}
            </div>

            {/* Botones Editar / Eliminar (glass, funcionales) */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => onEdit?.({ id, nombre })}
                    disabled={deleting}
                    className="flex-1 bg-white/5 text-white/80 text-sm font-medium py-2.5 px-4 rounded-lg
                               cursor-pointer border border-white/10 backdrop-blur-sm
                               hover:bg-white/10 hover:border-white/20
                               transition-all duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ✏️ Editar
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 bg-red-500/15 text-red-300 text-sm font-medium py-2.5 px-4 rounded-lg
                               cursor-pointer border border-red-500/30 backdrop-blur-sm
                               hover:bg-red-500/25 hover:border-red-500/50
                               transition-all duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {deleting ? '⏳ Eliminando...' : '🗑️ Eliminar'}
                </button>
            </div>
        </article>
    );
}
