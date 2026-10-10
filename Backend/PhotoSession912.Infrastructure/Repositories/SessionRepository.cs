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
        return await _context.Sessions.OrderBy(s => s.Id).ToListAsync(); 
    }

    public async Task<Session> AddAsync(Session session) 
    {

        await _context.Sessions.AddAsync(session);  
        await _context.SaveChangesAsync(); // Guardamos los cambios en la BD
        return session;
    }

    public async Task<Session?> GetByIdAsync(int id)
    {
        return await _context.Sessions.FindAsync(id);
    }

    public async Task<Session> UpdateAsync(Session session)
    {
        _context.Sessions.Update(session);
        await _context.SaveChangesAsync();
        return session;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var session = await _context.Sessions.FindAsync(id);
        if (session == null)
        {
            return false;
        }

        _context.Sessions.Remove(session);
        await _context.SaveChangesAsync();
        return true;
    }

}