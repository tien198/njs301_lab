import { BackendAPI } from "../../util/utilEnum";
import { useLoaderData } from "react-router-dom";

function UserIndex() {
    const loader: any[] = useLoaderData()

    return (
        <>
            {loader.length > 0
                ? loader.map(i => <p key={i.name}>{i.name}</p>)
                : <h1>No User Found!</h1>
            }
        </>
    );
}

export async function userLoader() {
    const res = await fetch(BackendAPI.base)
    const data = await res.json()
    return data
}

export default UserIndex;