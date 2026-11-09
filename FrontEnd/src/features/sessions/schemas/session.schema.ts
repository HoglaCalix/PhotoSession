import { z } from 'zod'

export const createSessionSchema = z.object({
  nombre: z
          .string()
          .trim() // Sanitiza espacios en blanco al inicio y al final
          .min(1, 'El nombre de la session no puede estar vacío.')
          .min(3, 'La Session debe tener al menos 3 caracteres.')
          .max(100, 'El nombre no puede superar los 100 caracteres permitidos en PostgreSQL.')
          .regex(
              /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,()-]+$/,
              'La Session  contiene caracteres especiales no permitidos.'
          ),
})

export type createSessionSchemaType = z.infer<typeof createSessionSchema>
