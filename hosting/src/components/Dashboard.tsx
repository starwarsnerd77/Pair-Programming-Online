import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { NavBar } from "./NavBar";
import { useEffect, useState } from "react";
import { getDocs, query, collection, where, setDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { ResponsiveDrawer } from "./ResponsiveDrawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

type SavedDocs = {
    title: string,
    uid: number,
    code: string,
    updatedAt: Timestamp
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
                code: doc.data().code,
                updatedAt: doc.data().updatedAt
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
        <List>
            {projects.map((project, index) => (
                <Card key={index} sx={{ m: 2, padding: 0, height: 75 }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h5" display='flex' noWrap component='div' alignItems='center'>{project.title}</Typography>
                        <Typography variant="body2" display='flex' noWrap component='div' alignItems='center'>{project.updatedAt.toDate().toString()}</Typography>
                        <ButtonGroup>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ButtonGroup>
                    </CardContent>
                </Card>
                // <ListItem key={index} disablePadding>
                //     <Card></Card>
                //     <ListItemButton onClick={() => loadSavedDoc(project)}>{project.title}</ListItemButton>
                // </ListItem>
                // <h2 key={index} onClick={() => loadSavedDoc(project)}>{project.title}</h2>
            ))}
        </List>
        // <button onClick={() => navigate("/editor")}>Editor</button>
    );
}