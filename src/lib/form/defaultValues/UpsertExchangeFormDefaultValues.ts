import { UpsertExchangeFormFieldValues } from '..'

export const UpsertExchangeTransactionOriginDefaultValues: UpsertExchangeFormFieldValues['origin'] =
  {
    treasuryBookId: '',
    entries: [],
  }

export const UpsertExchangeTransactionDestinationDefaultValues: UpsertExchangeFormFieldValues['destination'] =
  {
    treasuryBookId: '',
    entries: [],
  }

export const UpsertExchangeFormDefaultValues: UpsertExchangeFormFieldValues = {
  accrualDate: new Date(),
  origin: UpsertExchangeTransactionOriginDefaultValues,
  destination: UpsertExchangeTransactionDestinationDefaultValues,
}
