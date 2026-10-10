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

    public SessionsController(ISessionRepository sessionRepository, IValidator<CreateSessionRequestDto> createValidator)
    {
        _sessionRepository = sessionRepository;
        _createValidator = createValidator;
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
}