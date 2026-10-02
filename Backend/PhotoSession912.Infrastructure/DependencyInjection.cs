using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PhotoSession912.Application.Interfaces;
using PhotoSession912.Infrastructure.Data;
using PhotoSession912.Infrastructure.Repositories;

namespace PhotoSession912.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {
        // Configuramos el contexto de EF Core con la cadena de conexión
        services.AddDbContext<PhotoSessionDBContext>(options =>
            options.UseNpgsql(connectionString));

        // Registramos el repositorio de sesiones
        services.AddScoped<ISessionRepository, SessionRepository>();

        return services;
    }
}