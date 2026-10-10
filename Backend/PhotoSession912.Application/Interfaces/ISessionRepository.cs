using PhotoSession912.Domain.Entities;

namespace PhotoSession912.Application.Interfaces;

public interface ISessionRepository 
{
    Task<IEnumerable<Session>> GetAllAsync();
    Task<Session> AddAsync(Session session);
    Task<Session?> GetByIdAsync(int id);
    Task<Session> UpdateAsync(Session session);
    Task<bool> DeleteAsync(int id);

}