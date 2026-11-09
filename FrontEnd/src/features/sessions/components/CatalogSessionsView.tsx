import {useState, useEffect} from 'react';
import type {Session} from '../types/sessions.types';
import {SessionCard} from './SessionCards';
import {fetchSessions} from '../api/sessionsApi';
import {SessionForm} from './SessionForm';
import {extractErrorMessages} from '../api/sessionsApi';

export function CatalogSessionsView() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [sessionToEdit, setSessionToEdit] = useState<Session | null>(null);



    useEffect(() => {
    // Disparamos la petición HTTP GET real hacia .NET al montar el componente
    fetchSessions()
      .then((datosPostGres) => {
        setSessions(datosPostGres);
        setError(null);
      })
      .catch((err) => {
        console .error('🚨 Error al consultar sesiones desde .NET:', err)
        setError(extractErrorMessages(err));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSessionCreated = (newSession: Session) => {
    setSessions((prevSessions) => [...prevSessions, newSession]);
    setShowForm(false); // Cerrar el formulario después de crear la sesión
    setSessionToEdit(null);
  }

  const handleSessionUpdated = (updatedSession: Session) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === updatedSession.id ? updatedSession : session
      )
    );
    setShowForm(false);
    setSessionToEdit(null);
  }

  const handleSessionDeleted = (id: number) => {
    // Eliminamos la sesión del estado local tras confirmar el DELETE en el backend
    setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
  }

  const openCreateForm = () => {
    setSessionToEdit(null);
    setShowForm(true);
  }

  const openEditForm = (session: Session) => {
    setSessionToEdit(session);
    setShowForm(true);
  }

  const closeForm = () => {
    setShowForm(false);
    setSessionToEdit(null);
  }



  const filteredSessions = sessions.filter((session) =>
    session.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

     return (
    <div>
            {/* Barra Superior de Título y Acción Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-sm">
            Catálogo Global de Sesiones
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Conectado en tiempo real vía HTTP/CORS con <code className="text-red-400 font-mono">PostgreSQL</code>
            .
          </p>
        </div>

        {!showForm && (
          <button
            onClick={openCreateForm}
            className="relative self-start sm:self-auto px-5 py-2.5 rounded-xl font-semibold text-sm text-white
                           bg-gradient-to-br from-red-500/80 to-rose-700/80 backdrop-blur-md
                           border border-white/20
                           shadow-lg shadow-red-900/50
                           hover:from-red-500 hover:to-rose-600 hover:border-white/30
                           hover:shadow-red-900/70 hover:-translate-y-0.5
                           active:scale-95
                           transition-all duration-300 ease-out cursor-pointer
                           before:absolute before:inset-x-0 before:top-0 before:h-px
                           before:rounded-t-xl before:bg-gradient-to-r
                           before:from-transparent before:via-white/60 before:to-transparent
                           before:transition-opacity before:duration-300
                           after:absolute after:inset-0 after:rounded-xl
                           after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent
                           after:-translate-x-full hover:after:translate-x-full
                           after:transition-transform after:duration-700 after:ease-out overflow-hidden">
          + Nueva Sesión
        </button>)}
      </div>

      {showForm && (
        <div className="mb-6 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg shadow-black/40
                        animate-in fade-in slide-in-from-top-8 zoom-in-95 duration-700 ease-out">
          <SessionForm
            sessionToEdit={sessionToEdit}
            onSessionSaved={sessionToEdit ? handleSessionUpdated : handleSessionCreated}
            onCancel={closeForm}
          />
        </div>
      )}


      {/* Buscador Reactivo */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="🔍 Filtrar sesiones en el catálogo..."
          value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-md bg-white/5 backdrop-blur-md
                     border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white
                     placeholder-white/40 shadow-inner shadow-black/30
                     focus:outline-none focus:border-red-500/50 focus:bg-white/[0.07]
                     transition-all"
        />
        <span className="text-xs text-white/50">
          Mostrando <strong className="text-red-400">{filteredSessions.length}</strong> de {sessions.length} registros en BD
        </span>
      </div>

      {loading && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-12 text-center">
          <p className="text-red-400 font-semibold animate-pulse text-lg">
            ⏳ Consultando endpoint GET /api/habitos en .NET...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-950/40 backdrop-blur-xl border border-red-500/40 rounded-xl p-6 text-center">
          <p className="text-red-400 font-bold text-base mb-1">🚨 Error de Comunicación Full-Stack</p>
          <p className="text-white/70 text-sm">{error}</p>
        </div>
      )}





        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSessions.map((session) => (
            <SessionCard
              key={session.id}
              id={session.id}
              nombre={session.nombre}
              onDelete={handleSessionDeleted}
              onEdit={openEditForm}
            />
          ))}
        </section>

    </div>
  )
}
