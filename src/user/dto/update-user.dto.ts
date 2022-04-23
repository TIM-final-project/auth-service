export class UpdatePasswordDto {
  readonly old_passwword: string;
  readonly new_password: string;
  readonly rol: number;
  readonly entityId: number;
}
