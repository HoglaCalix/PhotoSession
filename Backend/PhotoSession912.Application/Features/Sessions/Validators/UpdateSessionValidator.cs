using FluentValidation;
using PhotoSession912.Application.Features.Sessions.DTOs;

namespace PhotoSession912.Application.Features.Sessions.Validators;

public class UpdateSessionValidator : AbstractValidator<UpdateSessionRequestDto>
{
    public UpdateSessionValidator()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty()
            .MaximumLength(100);
    }
}
