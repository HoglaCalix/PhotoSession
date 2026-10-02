using DotNetEnv;
using PhotoSession912.Infrastructure;
using Scalar.AspNetCore; // 1. Importamos Scalar

var builder = WebApplication.CreateBuilder(args);

Env.Load();
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__PostgresConnection") 
                       ?? throw new InvalidOperationException("Falta la cadena de conexión.");

builder.Services.AddInfrastructure(connectionString);
builder.Services.AddControllers();

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

app.MapControllers();
app.Run();