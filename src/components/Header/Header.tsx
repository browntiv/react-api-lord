import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
    return (
        <Link className="link" to={`/`}>
            <h1 className="title"> Movies Zone </h1>
        </Link>
    )
}

export default Header;