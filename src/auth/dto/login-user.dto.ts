import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
