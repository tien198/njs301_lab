import { useRouteError } from "react-router-dom";
import NavBar from "../components/layouts/NavBar";

function Error() {
    const error: any = useRouteError()
    return (
        <>
            <NavBar />
            <div>
                {error.message}
            </div>
        </>
    );
}

export default Error;