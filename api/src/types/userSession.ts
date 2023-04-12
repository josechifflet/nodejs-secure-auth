import { z } from 'zod';

export const UserSessionDataSchema = z.object({
  ID: z.string().uuid(),
  lastActive: z.string(),
  sessionInfo: z.object({ device: z.string(), ip: z.string() }),
  signedIn: z.string(),
  jwtId: z.string().uuid(),
  jwtPayload: z.object({
    aud: z.string(),
    exp: z.number(),
    iat: z.number(),
    iss: z.string(),
    jti: z.string().uuid(),
    nbf: z.number(),
    sub: z.string(),
  }),
});

export type UserSessionDataSchemaType = z.infer<typeof UserSessionDataSchema>;
