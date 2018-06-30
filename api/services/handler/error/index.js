exports.errorHandler = (res, error, status) => {

    const response = {};

    response.status = status || (error && error.status) || 500;

    if (error && typeof error === 'string') {
        response.message = error;
    } else if (error && error.message) {
        response.message = error.message;
    } else {
        response.message = 'Unknown Error';
    }

    if (error.code) {
        response.message = getUniqueErrorMessage(error);
    }

    if (error && error.errors) {
        response.errorList = [];
        Object.keys(error.errors).forEach((key) => {
            if (error.errors[key].message) {
                response.errorList.push(error.errors[key].message);
            }
        });
    }

    if (process.env.NODE_ENV !== 'production' && error && error.stack) {
        response.stack = error.stack;
    }

    response.status >= 500 && logger.error(error);

    return res.status(response.status).json(response);
};