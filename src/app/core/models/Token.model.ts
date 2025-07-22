export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  jti: string;
  Identification: string;
  RoleId: string;
  Purpose: string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}
