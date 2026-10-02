using FluentValidation;
using PhotoSession912.Application.Features.Sessions.DTOs;

namespace PhotoSession912.Application.Features.Sessions.Validators;

public class CreateSessionValidator : AbstractValidator<CreateSessionRequestDto>
{
    public CreateSessionValidator() 
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre de la sesión no puede estar vacío.")
            .MinimumLength(3).WithMessage("El nombre de la sesión debe tener al menos 3 caracteres.")
            .MaximumLength(100).WithMessage("El nombre de la sesión es demasiado largo.");
    }
}