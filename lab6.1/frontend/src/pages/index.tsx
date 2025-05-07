import { ActionFunctionArgs, redirect, useSubmit } from "react-router-dom";
import { BackendAPI } from "../util/utilEnum";
import { FormEvent, useState } from "react";

function Home() {
    const [name, setName] = useState('')
    const submit = useSubmit()
    function onSubmit(e: FormEvent) {
        e.preventDefault()
        submit({ name: name }, {
            method: 'POST',
            action: location.pathname
        })
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <button>Add User</button>
            </form>
        </div>
    );
}

export async function addUserAction(args: ActionFunctionArgs) {
    const userData = Object.fromEntries((await args.request.formData()).entries())
    console.log(userData);

    const res = await fetch(BackendAPI.base, {
        method: args.request.method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    if (res.status === 200)
        return redirect('/users')
}

export default Home;