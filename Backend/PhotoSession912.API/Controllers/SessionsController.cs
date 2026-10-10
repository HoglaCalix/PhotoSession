using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;
using PhotoSession912.Application.Interfaces;
using PhotoSession912.Domain.Entities;
using PhotoSession912.Application.Features.Sessions.DTOs;

namespace PhotoSession912.API.Controllers;



[ApiController]
[Route("api/[controller]")] // Define la ruta: http://localhost:puerto/api/habitos
public class SessionsController : ControllerBase
{
    private readonly ISessionRepository _sessionRepository;
    public readonly IValidator<CreateSessionRequestDto> _createValidator;
    public readonly IValidator<UpdateSessionRequestDto> _updateValidator;

    public SessionsController(ISessionRepository sessionRepository, IValidator<CreateSessionRequestDto> createValidator, IValidator<UpdateSessionRequestDto> updateValidator)
    {
        _sessionRepository = sessionRepository;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }

       [HttpGet]
    public async Task<IActionResult> GetSessions() {
        var sessions = await _sessionRepository.GetAllAsync();

        var response = sessions.Select(h=> new SessionResponseDto
        {
            Id = h.Id,
            Nombre = h.Nombre
        });
        return Ok(response); // HTTP 200 OK
    }

    [HttpPost]
    public async Task<IActionResult> CreateSession([FromBody] CreateSessionRequestDto request) {
        var validationResult = await _createValidator.ValidateAsync(request);
        if (!validationResult.IsValid) {
            return BadRequest(validationResult.Errors); // HTTP 400 Bad Request
        }

        var newSession = new Session {
            Nombre = request.Nombre
        };

        var createdSession = await _sessionRepository.AddAsync(newSession);
        

        var response = new SessionResponseDto {
            Id = createdSession.Id,
            Nombre = createdSession.Nombre
        };
        // HTTP 201 Created: Devuelve el recurso recién creado por cortesía RESTful
        return CreatedAtAction(nameof(GetSessions), new { id = createdSession.Id }, response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSessionById(int id) {
        var session = await _sessionRepository.GetByIdAsync(id);
        if (session == null) {
            return NotFound(); // HTTP 404 Not Found
        }

        var response = new SessionResponseDto {
            Id = session.Id,
            Nombre = session.Nombre
        };
        return Ok(response); // HTTP 200 OK
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSession(int id, [FromBody] UpdateSessionRequestDto request) {
        var validationResult = await _updateValidator.ValidateAsync(request);
        if (!validationResult.IsValid) {
            return BadRequest(validationResult.Errors); // HTTP 400 Bad Request
        }

        var existingSession = await _sessionRepository.GetByIdAsync(id);
        if (existingSession == null) {
            return NotFound(); // HTTP 404 Not Found
        }

        existingSession.Nombre = request.Nombre;
        var updatedSession = await _sessionRepository.UpdateAsync(existingSession);

        var response = new SessionResponseDto {
            Id = updatedSession.Id,
            Nombre = updatedSession.Nombre
        };
        return Ok(response); // HTTP 200 OK
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSession(int id) {
        var result = await _sessionRepository.DeleteAsync(id);
        if (!result) {
            return NotFound(); // HTTP 404 Not Found
        }

        return NoContent(); // HTTP 204 No Content
    }
}