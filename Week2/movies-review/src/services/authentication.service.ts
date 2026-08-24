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

    const token = jwt.sign(
      { id: user.id, mail: user.mail, role: user.role },
      JWT_VARIABLES.JWT_SECRET,
      { expiresIn: JWT_VARIABLES.JWT_EXPIRES_IN },
    );

    return {
      message: "User registered successfully",
      token,
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

    const token = jwt.sign(
      { id: user.id, mail: user.mail, role: user.role },
      JWT_VARIABLES.JWT_SECRET,
      { expiresIn: JWT_VARIABLES.JWT_EXPIRES_IN },
    );

    return {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        mail: user.mail,
        role: user.role,
      },
    };
  };
}
