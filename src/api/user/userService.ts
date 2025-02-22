import { StatusCodes } from "http-status-codes";

import type { UserDocument } from "@/api/user/userModel.js";
import { UserRepository } from "@/api/user/userRepository.js";
import { ServiceResponse } from "@/common/models/serviceResponse.js";
import { logger } from "@/server.js";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  // Retrieves all users from the database
  async findAll(): Promise<ServiceResponse<UserDocument[] | null>> {
    try {
      const users = await this.userRepository.findAllAsync();
      return ServiceResponse.success<UserDocument[]>("Users found", users);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a single user by their ID
  async findById(id: string): Promise<ServiceResponse<UserDocument | null>> {
    try {
      const user = await this.userRepository.findByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<UserDocument>("User found", user);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Retrieves a single user by their wallet address
  async findByWallet(walletAddress: string): Promise<ServiceResponse<UserDocument | null>> {
    try {
      const user = await this.userRepository.findByWalletAsync(walletAddress);
      if (!user) {
        return ServiceResponse.failure("User not found by wallet address", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<UserDocument>("User found by wallet address", user);
    } catch (ex) {
      const errorMessage = `Error finding user by wallet address ${walletAddress}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding user by wallet address.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const userService = new UserService();
