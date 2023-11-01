import { GroupDao } from "@/server/lib/db/dao"
import { ControllerError } from "../../error"
import { AccountApi } from "@/server/routers/account/account.types"

/**
 * createGroup controller
 */
export const createGroup = async ({ currency, name, categoryId }: AccountApi.CreateGroupInput): Promise<void> => {
  try {
    await GroupDao.createGroup({ currency }, { name, categoryId })
  } catch (error) {
    throw ControllerError(error)
  }
}

/**
 * updateGroupName controller
 */
export const updateGroupName = async({ id, name }: AccountApi.UpdateGroupNameInput): Promise<void> => {
  try {
    await GroupDao.updateGroup({ id, name })
  } catch (error) {
    throw ControllerError(error)
  }
}

/**
 * updateGroupCategory controller
 */
export const updateGroupCategory = async ({ id, categoryId }: AccountApi.UpdateGroupCategoryInput): Promise<void> => {
  try {
    await GroupDao.updateGroup({ id, categoryId })
  } catch (error) {
    throw ControllerError(error)
  }
}

/**
 * getAllGroups controller
 */
export const getAllGroups = async ({ currency }: AccountApi.GetAllGroupsInput): Promise<void> => {
  try {
    await GroupDao.getGroups({ currency })
  } catch (error) {
    throw ControllerError(error)
  }
}