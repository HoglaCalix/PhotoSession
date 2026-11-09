import {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type {Session} from '../types/sessions.types';
import {createSession, updateSession, extractErrorMessages} from '../api/sessionsApi';
import { createSessionSchema, type createSessionSchemaType } from '../schemas/session.schema';

interface SessionFormProps {
    onSessionSaved: (newSession: Session) => void;
    onCancel: () => void;
    sessionToEdit?: Session | null;
}

export function SessionForm({onSessionSaved, onCancel, sessionToEdit}: SessionFormProps) {
    const [errorServidor , setErrorServidor] = useState<string | null>(null);
    const isEditing = Boolean(sessionToEdit);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<createSessionSchemaType>({
        resolver: zodResolver(createSessionSchema),
        mode: 'onChange', // Evalúa cada tecla mientras el usuario escribe
        defaultValues: {
            nombre: sessionToEdit?.nombre ?? '',
        },
    })

    // Sincroniza el formulario cuando cambia la sesión a editar (abrir/cerrar edición)
    useEffect(() => {
        reset({ nombre: sessionToEdit?.nombre ?? '' });
    }, [sessionToEdit, reset]);

    const processCleanSend = async (validatedData: createSessionSchemaType) => {
        try{
            setErrorServidor(null)

            let savedSession: Session;
            if (sessionToEdit) {
                // Verbo PUT -> UpdateSessionRequestDto -> SessionResponseDto (200 OK)
                savedSession = await updateSession(sessionToEdit.id, validatedData);
            } else {
                // Verbo POST -> CreateSessionRequestDto -> SessionResponseDto (201 Created)
                savedSession = await createSession(validatedData);
            }

            reset()
            onSessionSaved(savedSession)
        } catch (error) {
            // Si .NET rechaza la operación (ej. Regla adicional en FluentValidation o Duplicado en BD),
            // extraemos y mostramos el mensaje exacto enviado por el Backend
            const mensajeExactoDeNet = extractErrorMessages(error)
            console.error('🚨 Rechazo reportado por el Backend .NET:', error)
            setErrorServidor(mensajeExactoDeNet)
        }
    }

    return (
        <form onSubmit={handleSubmit(processCleanSend)} className="flex flex-col gap-4">
            <div>
                <div className="mb-1 text-sm font-semibold text-white">
                    {isEditing ? 'Editar Sesión' : 'Registrar Nueva Sesión'}
                </div>
                <span className="text-xs text-white/50 font-mono">
                    {isEditing ? '🔄' : '🛡️'} {isEditing ? `PUT /api/Sessions/${sessionToEdit?.id}` : 'Esquema Zod + FluentValidation .NET'}
                </span>
                <label htmlFor="nombre" className="block mt-4 mb-1 text-sm font-medium text-white/80">
                    Nombre de la sesión
                </label>
                <input
                    type="text"
                    id="nombre"
                    disabled={isSubmitting}
                     autoFocus
                        {...register('nombre', {
                            onChange: () => {
                                if (errorServidor) setErrorServidor(null)
                            },
                        })}
                    className="w-full bg-white/5 backdrop-blur-md
                               border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white
                               placeholder-white/40 shadow-inner shadow-black/30
                               focus:outline-none focus:border-red-500/50 focus:bg-white/[0.07]
                               transition-all"
                    placeholder="Ingrese el nombre de la sesión"
                />
                <button type="submit" disabled={!isValid || isSubmitting} className="mt-4 relative self-start px-5 py-2.5 rounded-xl font-semibold text-sm text-white
                           bg-gradient-to-br from-red-500/80 to-rose-700/80 backdrop-blur-md
                           border border-white/20
                           shadow-lg shadow-red-900/50
                           hover:from-red-500 hover:to-rose-600 hover:border-white/30
                           transition-all cursor-pointer disabled:opacity-50
                           before:absolute before:inset-x-0 before:top-0 before:h-px
                           before:rounded-t-xl before:bg-gradient-to-r
                           before:from-transparent before:via-white/60 before:to-transparent">
                    {isSubmitting ? '⏳ Guardando en BD...' : isEditing ? '💾 Actualizar en PostgreSQL' : '💾 Guardar en PostgreSQL'}
                </button>

            </div>
            {errorServidor && (
                <div className="bg-red-950/40 backdrop-blur-xl border border-red-500/40 rounded-xl p-3 text-sm text-red-400">
                    {errorServidor}
                </div>
            )}
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="inline-flex items-center px-5 py-2.5 rounded-xl font-semibold text-sm text-white
                               bg-white/5 backdrop-blur-md border border-white/10
                               shadow-lg shadow-black/40
                               hover:bg-white/10 hover:border-white/20
                               transition-all cursor-pointer"
                >
                    Cancelar
                </button>

            </div>

            {errors.nombre && (
                <p className="text-amber-400 text-xs mt-2.5 font-medium flex items-center gap-1.5">
                    <span>⚡</span> <strong>Validación en vivo:</strong> {errors.nombre.message}
                </p>
            )}

            {/* 2. Retroalimentación del Servidor (Mensaje EXACTO devuelto por .NET FluentValidation) */}
            {errorServidor && (
                <div className="mt-3 bg-red-950/60 border border-red-500/40 rounded-lg p-3 text-xs text-red-300 flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <span><strong>Respuesta del Backend (.NET):</strong> {errorServidor}</span>
                </div>
            )}
        </form>
    )
}
