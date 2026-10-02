using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

using PhotoSession912.Application.Interfaces;
using PhotoSession912.Domain.Entities;

namespace PhotoSession912.API.Controllers;


[ApiController]
[Route("api/[controller]")] // Define la ruta: http://localhost:puerto/api/habitos
public class SessionsController : ControllerBase
{
    private readonly ISessionRepository _sessionRepository;

    public SessionsController(ISessionRepository sessionRepository)
    {
        _sessionRepository = sessionRepository;
    }

       [HttpGet]
    public async Task<IActionResult> GetSessions() {
        var sessions = await _sessionRepository.GetAllAsync();
        return Ok(sessions); // HTTP 200 OK
    }

    [HttpPost]
    public async Task<IActionResult> CreateSession([FromBody] Session session) {
        if (string.IsNullOrWhiteSpace(session.Nombre)) {
            return BadRequest("El nombre de la sesión es obligatorio."); // HTTP 400 Bad Request
        }

        var nuevaSession = await _sessionRepository.AddAsync(session);
        
        // HTTP 201 Created: Devuelve el recurso recién creado por cortesía RESTful
        return CreatedAtAction(nameof(GetSessions), new { id = nuevaSession.Id }, nuevaSession);
    }
}