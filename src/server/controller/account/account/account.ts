import { AccountDao } from "@/server/lib/db/dao"
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