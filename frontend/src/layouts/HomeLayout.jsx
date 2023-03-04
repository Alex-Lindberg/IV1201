import { useNavigate, useOutlet } from "react-router-dom";
import { defaultUser } from "../utils/AuthUtils";

const HomeLayout = () => {
	const navigate = useNavigate();
	const outlet = useOutlet();
	const user = defaultUser;

	if (!user) {
		navigate('/');
	}
	return outlet;
};
export default HomeLayout;
