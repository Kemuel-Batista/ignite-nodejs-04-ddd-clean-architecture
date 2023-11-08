import { Either, left, right } from './either'

describe('Either', () => {
  function doSomething(shouldSuccess: boolean): Either<string, number> {
    if (shouldSuccess) {
      return right(10)
    } else {
      return left('error')
    }
  }

  // it('success result', () => {
  //   const success = right('success')

  //   expect(success.value).toEqual('success')
  // })

  // it('error result', () => {
  //   const error = left('error')

  //   expect(error.value).toEqual('error')
  // })

  it('success result', () => {
    const result = doSomething(true)

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
  })

  it('error result', () => {
    const result = doSomething(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
  })
})