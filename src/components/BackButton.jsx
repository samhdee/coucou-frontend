import {Link} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
    return (
        <Link className="back-btn" to={{ pathname: "/" }} title="Retour">
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </Link>
    )
}