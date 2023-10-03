/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable n/handle-callback-err */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import AE from 'aggregate-error'
import { type ValidationError } from 'class-validator'
import { type TypeORMError } from 'typeorm'

interface IError extends Error {
  field: string | null
  message: string
}

export function aggregateErrors (
  errors: ValidationError[]
  // ): AggregateError<Error> {
): any {
  const errorsFormated = errors.map((error) => {
    console.log('ERROR DE VALIDATION : ', error)
    if (error.constraints) {
      // const key = Object.keys(error.constraints); // "min"
      const key = Object.keys(error?.constraints || {})[0] // "min"
      console.log('KEY =============>', key)
      console.log('PROPERTY', error.property)
      const result = {
        field: error.property,
        message: error.constraints[key] // error.contraints["min"]
      }
      console.log('RESULTTTTTTTTTT', result)
      return {
        field: error.property,
        message: error.constraints[key] // error.contraints["min"]
      }
    } else {
      return {}
    }
  })
  return errorsFormated
  //   if (error?.constraints) {
}

export function formatedErrors (err: AggregateError | TypeORMError) {
  const e: any = {
    errors: []
  }

  if (err.name === 'AggregateError') {
    const aggregateError: any = err as AE<IError>;
    e.errors = aggregateError.errors
  }

  return e
}
