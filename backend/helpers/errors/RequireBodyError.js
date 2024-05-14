class RequireBodyErrror extends Error{
    constructor(notIncludedErrror){
        super()
        this.status = 400
        this.message = `Request must include the fields: ${notIncludedFields.join(',')}`
    }
}

module.exports = RequireBodyErrror