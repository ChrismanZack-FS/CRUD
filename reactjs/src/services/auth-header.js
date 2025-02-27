const authHeader = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	//working

	if (user && user.token) {
		// prettier-ignore
		return { "Authorization": `${user.token}` };
	} else {
		return {};
	}
};

export default authHeader;
