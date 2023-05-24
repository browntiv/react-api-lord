import { Spinner } from "react-bootstrap";
import "./LoadingContainer.scss";

const LoadingContainer = () => {
    return (
        <>
            <Spinner className="loading" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>
    )
}

export default LoadingContainer;