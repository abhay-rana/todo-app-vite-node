//types of error we get by saving the data in the mongodb

const errorHandlers = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	//Wrong mongoose object id error
	if (err.name === "CastError") {
		const message = `Resource not found. Invalid ${err.path}`;
		error = new Error(message);
	}

	//Handling Mongoose Validation Error
	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map((value) => value.message);
		error = new Error(message);
	}

	//Handling Mongoose duplicate key errors
	if (err.code === 11000) {
		const message = `Duplicate ${Object.keys(err.KeyValue)} entered`;
		error = new Error(message);
	}

	console.log("error is ", error);

	const status = res.statusCode ? res.statusCode : 500;

	res.status(status).send(error.message || "Internal server error");
};

export default errorHandlers;
