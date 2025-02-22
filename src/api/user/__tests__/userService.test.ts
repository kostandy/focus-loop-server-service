import { StatusCodes } from "http-status-codes";
import type { Mock } from "vitest";

import { UserRepository } from "@/api/user/userRepository.js";
import { UserService } from "@/api/user/userService.js";
import { ServiceResponse } from "@/common/models/serviceResponse.js";
import type { UserDocument } from "../userModel.js";

vi.mock("@/api/user/userRepository");

describe("userService", () => {
  let userServiceInstance: UserService;
  let userRepositoryInstance: UserRepository;

  const mockUsers: UserDocument[] = [
    {
      id: "1",
      wallet: "0:d8cd999fb2b1b384e6ca254c3883375e23111a8b78c015b886286c31bf11e29d",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as UserDocument,
    {
      id: "2",
      wallet: "0:0000000000000000000000000000000000000000000000000000000000000000",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as UserDocument,
  ];

  beforeEach(() => {
    userRepositoryInstance = new UserRepository();
    userServiceInstance = new UserService(userRepositoryInstance);
  });

  describe("findAll", () => {
    it("return all users", async () => {
      // Arrange
      vi.spyOn(userRepositoryInstance, "findAllAsync").mockReturnValue(Promise.resolve(mockUsers));

      // Act
      const result = await userServiceInstance.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("Users found");
      expect(result.data).toEqual(mockUsers);
    });

    it("returns a success for no users found", async () => {
      // Arrange
      vi.spyOn(userRepositoryInstance, "findAllAsync").mockReturnValue(Promise.resolve([]));

      // Act
      const result = await userServiceInstance.findAll();

      console.log("result", result);
      console.log("result.statusCode", result.statusCode);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(Array.isArray(result.data)).toBeTruthy();
    });

    it("handles errors for findAllAsync", async () => {
      // Arrange
      vi.spyOn(userRepositoryInstance, "findAllAsync").mockRejectedValue(new Error("Database error"));

      // Act
      const result = await userServiceInstance.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("An error occurred while retrieving users.");
      expect(result.data).toBeNull();
    });
  });

  describe("findById", () => {
    it("returns a user for a valid ID", async () => {
      // Arrange
      const testId = "1";
      const mockUser = mockUsers.find((user) => user.id === testId);
      vi.spyOn(userRepositoryInstance, "findByIdAsync").mockReturnValue(Promise.resolve(mockUser as UserDocument));

      // Act
      const result = await userServiceInstance.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("User found");
      expect(result.data).toEqual(mockUser);
    });

    it("handles errors for findByIdAsync", async () => {
      // Arrange
      const testId = "1";
      (userRepositoryInstance.findByIdAsync as Mock).mockRejectedValue(new Error("Database error"));

      // Act
      const result = await userServiceInstance.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("An error occurred while finding user.");
      expect(result.data).toBeNull();
    });

    it("returns a not found error for non-existent ID", async () => {
      // Arrange
      const testId = "1";
      (userRepositoryInstance.findByIdAsync as Mock).mockReturnValue(null);

      // Act
      const result = await userServiceInstance.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("User not found");
      expect(result.data).toBeNull();
    });
  });
});
