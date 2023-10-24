//is the particular user is have permission to edit or show this page/route
//it does not releted with logged-in 
//the user can be logged-in but it does not mean it have all the permissions 

const isAuthorizedUSer = (...roles) => {
	return (req, res, next) => {
		if (roles.includes(req.user.role)) {
			return res.json({
				message: `${req.user.fullname} is not allowed to perform this operation`,
			});
		}
		next();
	};
};

export default isAuthorizedUSer;
