import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSocket } from "../hooks/socket";
import { useNavigate } from "react-router-dom";

type IMsg = {
    text: string,
    own?: boolean
}

const Home = () => {
    const socket = useSocket();
    const nav = useNavigate();
    const [msg, setMsg] = useState<IMsg[]>([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            nav("/login")
        }
    }, []);

    useEffect(() => {
        socket.on("token_error", () => {
            handleLogout();
            socket.disconnect();
        });
        socket.on("answer_new_data", (data) => {
            setMsg((pr) => [...pr, { text: data.data, own: false }]);
        })
    }, [socket])

    const handleLogout = () => {
        localStorage.removeItem("token");
        nav("/login")
    }

    const [text, setText] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit("new_data", { data: text }, (payload: any) => {
            console.log(payload);

            setMsg((pr) => [...pr, { text: payload.data, own: true }])
        });

        setText("")
    }
    return (
        <div>
            <h2>home</h2>
            <div>
                <button onClick={handleLogout}>logout</button>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <input value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)} type="text" placeholder="matn kiriting..." />
                </form>
            </div>
            <div>
                {
                    msg.map((m, index) => (
                        <div key={index}>
                            <h3>{m.text} <sup>{m.own ? "own" : ""}</sup></h3>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;