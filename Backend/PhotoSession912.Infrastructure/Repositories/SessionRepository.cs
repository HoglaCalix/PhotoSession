using Microsoft.EntityFrameworkCore;
using PhotoSession912.Application.Interfaces;
using PhotoSession912.Domain.Entities;
using PhotoSession912.Infrastructure.Data;

namespace PhotoSession912.Infrastructure.Repositories;

// Implementamos la interfaz (La finca obedece a la receta)
public class SessionRepository : ISessionRepository 
{
    private readonly PhotoSessionDBContext _context;
    
    // El constructor recibe el contexto de EF Core
    public SessionRepository(PhotoSessionDBContext context) 
    {
        _context = context;
    }

    public async Task<IEnumerable<Session>> GetAllAsync() 
    {
        // Consulta real a la BD (Magia SQL) a través de Entity Framework
        return await _context.Sessions.ToListAsync(); 
    }

    public async Task<Session> AddAsync(Session session) 
    {

        await _context.Sessions.AddAsync(session);  
        await _context.SaveChangesAsync(); // Guardamos los cambios en la BD
        return session;
    }
}