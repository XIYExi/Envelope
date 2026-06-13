import { z } from "zod";

export const authSchema = z.object({
  version: z.string().default("3.0.0"),
  providers: z
    .array(
      z.object({
        name: z.enum(["email", "google", "github", "gitlab", "azure", "discord"]),
        enabled: z.boolean().default(true),
        config: z.record(z.string()).default({}),
      }),
    )
    .default([{ name: "email" as const, enabled: true, config: {} }]),
  redirectUrls: z
    .object({
      afterLogin: z.string().default("/"),
      afterLogout: z.string().default("/login"),
      afterSignup: z.string().default("/"),
      emailConfirmation: z.string().optional(),
    })
    .default({}),
  session: z
    .object({
      duration: z.number().default(3600),
      refreshTokenRotation: z.boolean().default(true),
    })
    .default({}),
});

export type AuthConfig = z.infer<typeof authSchema>;
