import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { NavBar } from "./NavBar";
import { useEffect, useState } from "react";
import { getDocs, query, collection, where, setDoc, doc, serverTimestamp } from "firebase/firestore";

type SavedDocs = {
    title: string,
    uid: number,
    code: string
}

export const Dashboard = () => {
    const user = auth.currentUser;
    const [projects, setProjects] = useState<SavedDocs[]>([]);
    const navigate = useNavigate();

    const getSavedDocs = async () => {
        const q = query(
            collection(db, "saved"),
            where("uid", "==", user?.uid)
        );
            
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const project: SavedDocs = {
                title: doc.data().title,
                uid: doc.data().uid,
                code: doc.data().code
            };


            setProjects(projects => [...projects, project]);
            // console.log(...result);
        });

    }

    const loadSavedDoc = async (project: SavedDocs) => {
        await setDoc(doc(db, "code", "current - " + project.uid), {
            code: project.code,
            updatedAt: serverTimestamp(),
            uid: project.uid,
            room: Math.floor(100000 + Math.random() * 900000)
        });

        navigate("/editor");
    }

    useEffect(() => {
        getSavedDocs();
    }, []);

    return (
        <div>
            <NavBar />
            <h1>This is your dashboard!!!!</h1>
            {projects.map((project, index) => (
                <h2 key={index} onClick={() => loadSavedDoc(project)}>{project.title}</h2>
            ))}

            <button onClick={() => navigate("/editor")}>Editor</button>
            
        </div>
    );
}