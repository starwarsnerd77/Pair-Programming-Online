import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

export const NavBar = () => {
    return (
        <div>
            <nav>
                <button onClick={() => signOut(auth)}>Sign Out</button>
            </nav>
        </div>
    );
}