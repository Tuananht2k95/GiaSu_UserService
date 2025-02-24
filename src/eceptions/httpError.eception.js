class HttpError extends Error {
    constructor ( message, statusCode ) {
        super(JSON.stringify(message));
        this.statusCode = statusCode
    }
};

export default HttpError;