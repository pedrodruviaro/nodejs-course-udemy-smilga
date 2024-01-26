function asyncWrapper(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error) // error middleware
    }
  }
}

module.exports = asyncWrapper
