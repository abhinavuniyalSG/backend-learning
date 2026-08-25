import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_VARIABLES } from "../config/secrets.js";
import { UsersRepository } from "../database/repository/users.repository.js";
import { HttpError } from "../utils/httpError.utils.js";

interface RegisterInput {
  name: string;
  mail: string;
  password: string;
}

interface LoginInput {
  mail: string;
  password: string;
}

export class AuthenticationService {
  public static register = async (data: RegisterInput) => {
    const existingUser = await UsersRepository.findByMail(data.mail);

    if (existingUser) {
      throw new HttpError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userDetail = {
      name: data.name,
      mail: data.mail,
      password: hashedPassword,
      role: "user",
    };

    const user = await UsersRepository.createUser(userDetail);

    const accessToken = jwt.sign(
      { id: user.id, mail: user.mail, role: user.role },
      JWT_VARIABLES.JWT_SECRET,
      { expiresIn: JWT_VARIABLES.JWT_EXPIRES_IN },
    );

    const refreshToken = jwt.sign(
      { id: user.id, mail: user.mail, role: user.role },
      JWT_VARIABLES.JWT_REFRESH_SECRET,
      { expiresIn: JWT_VARIABLES.JWT_REFRESH_EXPIRES_IN },
    );

    await UsersRepository.updateRefreshToken(user.id, refreshToken);

    return {
      message: "User registered successfully",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        mail: user.mail,
        role: user.role,
      },
    };
  };

  public static login = async (data: LoginInput) => {
    const user = await UsersRepository.findByMail(data.mail);

    if (!user) {
      throw new HttpError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid email or password");
    }

    const accessToken = jwt.sign(
      { id: user.id, mail: user.mail, role: user.role },
      JWT_VARIABLES.JWT_SECRET,
      { expiresIn: JWT_VARIABLES.JWT_EXPIRES_IN },
    );

    const refreshToken = jwt.sign(
      { id: user.id, mail: user.mail, role: user.role },
      JWT_VARIABLES.JWT_REFRESH_SECRET,
      { expiresIn: JWT_VARIABLES.JWT_REFRESH_EXPIRES_IN },
    );

    await UsersRepository.updateRefreshToken(user.id, refreshToken);

    return {
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        mail: user.mail,
        role: user.role,
      },
    };
  };

  public static refresh = async (token: string) => {
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_VARIABLES.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new HttpError(401, "Invalid or expired refresh token");
    }

    if (!decoded?.id) {
      throw new HttpError(401, "Invalid refresh token payload");
    }

    const user = await UsersRepository.findByIdWithRefreshToken(decoded.id);
    if (!user || user.refreshToken !== token) {
      throw new HttpError(401, "Invalid refresh token");
    }

    const accessToken = jwt.sign(
      { id: user.id, mail: user.mail, role: user.role },
      JWT_VARIABLES.JWT_SECRET,
      { expiresIn: JWT_VARIABLES.JWT_EXPIRES_IN },
    );

    const newRefreshToken = jwt.sign(
      { id: user.id, mail: user.mail, role: user.role },
      JWT_VARIABLES.JWT_REFRESH_SECRET,
      { expiresIn: JWT_VARIABLES.JWT_REFRESH_EXPIRES_IN },
    );

    await UsersRepository.updateRefreshToken(user.id, newRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  };

  public static logout = async (userId: string) => {
    await UsersRepository.updateRefreshToken(userId, null);
    return {
      message: "Logout successful",
    };
  };
}
