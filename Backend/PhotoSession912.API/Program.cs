using DotNetEnv; // Agregar este using

var builder = WebApplication.CreateBuilder(args);

// Cargar variables de entorno desde el archivo .env local
Env.Load();

// El resto de la configuración...