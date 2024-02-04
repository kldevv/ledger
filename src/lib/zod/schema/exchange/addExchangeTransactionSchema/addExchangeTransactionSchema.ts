import { z } from 'zod'
import { addEntrySchema } from '../../entries'

export const addExchangeTransactionSchema = z.object({
  /**
   * Treasury book id
   */
  treasuryBookId: z.string(),
  /**
   * Entries
   */
  entries: addEntrySchema.array(),
})
