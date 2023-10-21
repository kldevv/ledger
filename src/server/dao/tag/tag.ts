import { Tag } from "@/server/model"
import { ObjectId } from 'mongodb'

const getAllTagNames = async () => {
  const projection = { name: 1 }
  try {
    return await Tag.find({}, { projection })
  } catch (error) {
    console.log('Error getAllTagNames')
    throw Error
  }
}


const getAllTagBalanceById = async (name: string) => {
  try {
    return await Tag.find({ name })
  } catch (error) {
    console.log('Error getAllTagBalanceById')
    throw Error
  }
}

const updateTagBalanceByIdByAccountIdByDate = async (id: string, accountIds: string[], date: Date, changes: { credit?: number, debit?: number}) => {
  const filter = {
    '_id': new ObjectId(id),
    'balance.accountId': { $in: accountIds },
    'balance.balance.year': date.getFullYear(),
    'balance.balance.month': date.getMonth() + 1,
  }

  const update = {
    $inc: {
      'balance.$.balance.$[element].debit': changes.credit || 0,
      'balance.$.balance.$[element].credit': changes.debit || 0,
    },
  }

  try {
    await Tag.updateOne(filter, update)
  } catch (error) {
    console.log('Error updateTagBalanceByIdByAccountIdByDate')
    throw Error
  }
}

const insertNewTag = async (name: string) => {

}