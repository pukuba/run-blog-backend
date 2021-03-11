import { createHash } from "crypto"

export const hashWithSalt = (pw: string, salt: string) => createHash("sha512").update(pw + salt).digest("hex")