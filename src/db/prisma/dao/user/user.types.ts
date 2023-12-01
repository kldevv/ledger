import { User } from "@prisma/client";

/**
 * createUser
 */
export type CreateUserArgs = Pick<User, 'name'>

/**
 * getUsers
 */
export type GetUsersArgs = Partial<Pick<User, 'id' | 'name'>>
export type GetUsersReturns = Pick<User, 'id' | 'name'>[]

/**
 * updateUser
 */
export type UpdateUserArgs = Pick<User, 'id' | 'name'>

/**
 * deleteUser
 */
export type DeleteUserArgs = Pick<User, 'id'>