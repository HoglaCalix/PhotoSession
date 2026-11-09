using DotNetEnv;
using PhotoSession912.Infrastructure;
using Scalar.AspNetCore; // 1. Importamos Scalar
using PhotoSession912.Application;

var builder = WebApplication.CreateBuilder(args);

Env.Load();
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__PostgresConnection") 
                       ?? throw new InvalidOperationException("Falta la cadena de conexión.");
builder.Services.AddApplication();
builder.Services.AddInfrastructure(connectionString);
builder.Services.AddControllers();

var corsAllowedOrigins = Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS")
    ?? throw new InvalidOperationException("Falta la variable de entorno CORS_ALLOWED_ORIGINS.");

builder.Services.AddCors(options =>
{
    options.AddPolicy("PoliticaCors", policy =>
    {
        // Separamos por coma por si existen múltiples orígenes (ej. localhost + https://*.unah.edu.hn)
        var origenes = corsAllowedOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        policy.WithOrigins(origenes)
              .SetIsOriginAllowedToAllowWildcardSubdomains() // Habilita comodines de subdominio (ej. https://*.unah.edu.hn)
              .AllowAnyHeader()                              // Autoriza encabezados JSON y futuros Tokens JWT
              .AllowAnyMethod();                             // Autoriza verbos GET y Preflights (POST, PUT, DELETE)
    });
});



// 2. Generación nativa de OpenAPI (viene por defecto en .NET 10)
builder.Services.AddOpenApi(); 

var app = builder.Build();
   app.MapOpenApi();
    
    // 4. Levanta la interfaz gráfica moderna consumiendo ese JSON
    app.MapScalarApiReference(); 

if (app.Environment.IsDevelopment())
{
    // 3. Genera el documento JSON con el contrato de la API

}

app.UseCors("PoliticaCors");
app.MapControllers();
app.Run();