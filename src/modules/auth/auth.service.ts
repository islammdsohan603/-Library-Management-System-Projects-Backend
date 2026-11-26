import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { pool } from "../../db/dataBase.js";
import { hashPassword } from "../../utils/passwordHelpers.js";
import type { UserLogin, UserRigister } from "./auth.interface.js";

const jwtSecret = process.env.JWT_SECRET as string;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET as string;

if (!jwtSecret) {
  throw new Error("JWT Secrets are missing");
}

// Custom Service Error
export class AuthServiceError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = "AuthServiceError";
  }
}

export const registersService = async (payload: UserRigister) => {
  // Step 1: Check Payload
  if (
    !payload ||
    typeof payload.name !== "string" ||
    typeof payload.email !== "string" ||
    typeof payload.password !== "string"
  ) {
    throw new AuthServiceError("Invalid Input", 400);
  }

  // Step 2: Destructure and Normalize
  const name = payload.name.trim();
  const email = payload.email.trim().toLowerCase();
  const password = payload.password;

  if (!name || !email || !password) {
    throw new AuthServiceError("All Fields are Required", 400);
  }

  // Step 3: Validate Password
  if (password.length < 8) {
    throw new AuthServiceError("Password must be at least 8 characters", 400);
  }

  // Step 4: Hash Password
  const passwordHashed = await hashPassword(password);

  // Step 5: Insert User
  const result = await pool.query(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, name, email, role, is_active, created_at
    `,
    [name, email, passwordHashed],
  );

  // Step 6: Check Duplicate Email
  if (result.rows.length === 0) {
    throw new AuthServiceError("Email has already been used", 409);
  }

  // Step 7: Return User Data
  return result.rows[0];
};

export const loginService = async (payload: UserLogin) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("All Fileds are Requred!");
  }

  const result = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  const user = result.rows[0];

  if (!user || !user.is_active) {
    throw new Error("Invalid Email or Password");
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid Email or Password");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = Jwt.sign(
    {
      ...jwtPayload,
      tokenType: "access",
    },
    jwtSecret,
    {
      expiresIn: "5m",
    },
  );

  const refreshToken = Jwt.sign(
    {
      sub: String(user.id),
      tokenType: "refresh",
    },
    jwtRefreshSecret,
    {
      expiresIn: "2d",
    },
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
