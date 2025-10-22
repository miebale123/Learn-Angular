import z from 'zod';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function zodFieldValidator<T extends z.ZodTypeAny>(
  schema: T,
  field: keyof z.infer<T>
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;

    if (!parent) return null;

    const formValues = parent.getRawValue?.() ?? { [field]: control.value };

    const parsed = schema.safeParse(formValues);
    if (parsed.success) return null;

    const issue = parsed.error.issues.find((i) => i.path[0] === field);
    return issue ? { zodError: issue.message } : null;
  };
}

const PasswordSchema = z
  .string()
  .min(8, 'Please enter at least 8 characters')
  .max(20, 'Password must be at most 20 characters')
  .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*$/, {
    message: 'Password must contain uppercase, lowercase, number, and symbol',
  });

export const SignupSchema = z
  .object({
    // email: z.string().trim().toLowerCase().email('Enter a valid email'),
    email: z.string(),
    password: z.string(),
  })
  .strict();

export const SigninSchema = z
  .object({
    // email: z.string().trim().toLowerCase().email('Enter a valid email'),
    // password: z.string(),
    email: z.string(),
    password: z.string(),
  })
  .strict();

export const ResetPasswordSchema = z
  .object({
    newPassword: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: PasswordSchema,
  confirmPassword: z.string(),
});

export type SignupDto = z.infer<typeof SignupSchema>;
export type SigninDto = z.infer<typeof SigninSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;

export type SignupErrors = Partial<Record<keyof SignupDto, string>>;
export type SigninErrors = Partial<Record<keyof SigninDto, string>>;
export type ResetPasswordErrors = Partial<Record<keyof ResetPasswordDto, string>>;
export type UpdatePasswordSchema = Partial<Record<keyof UpdatePasswordDto, string>>;
