import React, { useEffect, useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([]);

    // Method to fetch all notes from the database
    const fetchNotes = async () => {
        try {
            const response = await fetch('https://blogger-ugeq.onrender.com/api/fetchnotes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch notes: ${response.statusText}`);
            }

            const data = await response.json();
            setNotes(data); 
        } catch (error) {
            console.error("Failed to fetch notes", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    // Method to delete a note from the database
    const deleteNote = async (noteId) => {
        try {
            const response = await fetch(`https://blogger-ugeq.onrender.com/api/deletenote/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete note: ${response.statusText}`);
            }

            // Remove the deleted note from the state
            setNotes(notes.filter(note => note.noteId !== noteId));
        } catch (error) {
            console.error("Failed to delete note", error);
        }
    };

    // Method to edit a note in the database
    const editNote = async (noteId, formData) => {
        try {
            const response = await fetch(`https://blogger-ugeq.onrender.com/api/updatenote/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update note: ${response.statusText}`);
            }
    
            const updatedNote = await response.json();
    
            setNotes(notes.map(note => note.noteId === noteId ? updatedNote.note : note));
        } catch (error) {
            console.error("Failed to update note", error);
        }
    };
    

    return (
        <noteContext.Provider value={{ notes, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
