import { auth } from "../lib/firebase";
import { NavBar } from "./NavBar";

export const Dashboard = () => {
    const user = auth.currentUser;

    return (
        <div>
            <NavBar />
            <h1>Dashboard!!!!</h1>
            <p>{user?.email}</p>
        </div>
    );
}