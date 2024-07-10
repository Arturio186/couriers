import { FC } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import './NotFound.scss';

const NotFound: FC = () => {
    return (
        <div className="not-found">
            <FaExclamationTriangle className="icon" />
            <h1>Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
