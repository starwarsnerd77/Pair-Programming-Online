import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { NavBar } from "./NavBar";

export const Dashboard = () => {
    const user = auth.currentUser;
    const navigate = useNavigate();

    return (
        <div>
            <NavBar />
            <h1>Dashboard!!!!</h1>
            <p>{user?.email}</p>

            <button onClick={() => navigate("/editor")}>Editor</button>
            
        </div>
    );
}