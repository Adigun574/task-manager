const { CustomApiError } = require('../errors/custom-error.js')

const errorHandler = (err, req, res, next) => {
    console.log(err)
    if(err instanceof CustomApiError){
        return res.status(err.statusCode).json({message: err.message})
    }
    return res.status(500).json({message: 'Something went wrong'})
}

module.exports = errorHandler