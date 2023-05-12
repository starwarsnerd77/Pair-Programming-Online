import { ChangeEvent, useEffect, useState } from "react"
import Editor, { useMonaco } from '@monaco-editor/react';
import { auth, db } from "../lib/firebase";
import {
    collection,
    serverTimestamp,
    setDoc,
    doc,
    query,
    orderBy,
    onSnapshot,
    limit,
    where,
    getDoc,
    getDocs
} from "firebase/firestore";
import { Unsubscribe } from "firebase/auth";
import { setUserId } from "firebase/analytics";

const numberOfDocs = async (room: number) => {
    const q = query(
        collection(db, "code"),
        where("room", "==", room)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
}

let room = Math.floor(100000 + Math.random() * 900000);
(async function() {
    while (await numberOfDocs(room) > 0) {
        room = Math.floor(100000 + Math.random() * 900000);
    }
})();

let unsub = () => {};

export const CodeEditor = () => {
    const [code, setCode] = useState("");
    const monaco = useMonaco();
    const user = auth.currentUser;
    const [docName, setDocName] = useState("current - " + user?.uid);
    const [title, setTitle] = useState("");
    
    useEffect(() => {
        // do conditional chaining
        monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
        // or make sure that it exists by other ways
        if (monaco) {
            console.log('here is the monaco instance:', monaco);
        }
    }, [monaco]);

    useEffect(() => {
        const q = query(
            collection(db, "code"),
            where("uid", "==", user?.uid)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setCode(QuerySnapshot.docs[0].data().code);
            setDocName("current - " + QuerySnapshot.docs[0].data().uid);
        });
        unsub = unsubscribe;
    }, []);

    const setDocOnChange = async (value: string) => {
        let uid = user?.uid;
        const docRef = doc(db, "code", docName);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            uid = docSnap.data().uid
        }
        await setDoc(doc(db, "code", docName), {
            code: value,
            updatedAt: serverTimestamp(),
            uid,
            room,
        });
    }
    
    const handleEditorChange = (value: string | undefined) => {
        setDocOnChange(value ? value : "");
    }

    const handleRoomChange = async (event: ChangeEvent<HTMLInputElement>) => {
        room = Number(event.target.value);
        const q = query(
            collection(db, "code"),
            where("room", "==", room)
        );
            
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            unsub();
            
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                setCode(QuerySnapshot.docs[0].data().code);
                setDocName("current - " + QuerySnapshot.docs[0].data().uid);
            });
            
            unsub = unsubscribe;
        }
    }

    const handleSave = async () => {
        let uid = user?.uid;

        await setDoc(doc(db, "saved", title), {
            code,
            updatedAt: serverTimestamp(),
            uid,
            title,
        });
    }


    return (
        <div>
            <div>
                <label>Title: </label>
                <input type="text" onChange={(event) => setTitle(event.target.value)} />
            </div>
            <label>Room #: </label>
            <input type="number" onChange={handleRoomChange} />
            <button onClick={handleSave}>Save</button>
            <Editor
                height="75vh"
                width="75vw"
                defaultValue="# some comment"
                value={code}
                onChange={handleEditorChange}
                defaultLanguage="python"
            />
        </div>
    );
};