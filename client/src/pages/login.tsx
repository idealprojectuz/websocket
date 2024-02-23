import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const nav = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            nav("/")
        }
    }, [])
    const [text, setText] = useState<string>("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem("token", text);
        nav("/");
    }
    return (
        <div>
            <h2>login page</h2>

            <div>
                <form onSubmit={handleSubmit}>
                    <input value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)} type="text" placeholder="login" />
                    <button >Send</button>
                </form>
            </div>
        </div>
    )
}

export default Login;