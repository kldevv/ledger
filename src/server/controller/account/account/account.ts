import { AccountDao } from "@/db/prisma/dao"
import { ControllerError } from "../../error"
import { AccountApi } from "@/server/routers/account/account.types"

/**
 * createAccount controller
 */
export const createAccount = async ({ currency, name, groupId }: AccountApi.CreateAccountInput): Promise<void> => {
  try {
    await AccountDao.createAccount({ currency }, { name, groupId })
  } catch (error) {
    throw ControllerError(error)
  }
}

/**
 * updateAccountName controller
 */
export const updateAccountName = async ({ id, name }: AccountApi.UpdateAccountNameInput): Promise<void> => {
  try {
    await AccountDao.updateAccount({ id, name })
  } catch (error) {
    throw ControllerError(error)
  }
}
