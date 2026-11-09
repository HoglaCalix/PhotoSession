export interface Session {
    id: number;
    nombre: string;
}

export interface CreateSessionDTO {
    nombre: string;
}

export interface UpdateSessionDTO {
    nombre: string;
}

export interface FluentValidationError {
    propertyName: string;
    errorMessage: string;
    attemptedValue?: unknown;
    errorCode?: string;
}