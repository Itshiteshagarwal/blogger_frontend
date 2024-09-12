import React, { useContext, useRef, useState, useEffect } from 'react';
import noteContext from '../context/Notes/noteContext';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, editNote, fetchNotes } = context;
    const [currentNote, setCurrentNote] = useState({ noteId: "", title: "", description: "", tag: "" });

    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        const loadNotes = async () => {
            try {
                await fetchNotes();
            } catch (error) {
                console.error("Failed to fetch notes:", error);
                props.showAlert('Failed to fetch notes', 'danger');
            }
        };

        loadNotes();
    }, [fetchNotes, props]);

    const updatedNote = (note) => {
        setCurrentNote({
            noteId: note.noteId,
            title: note.title,
            description: note.description,
            tag: note.tag
        });
        ref.current.click();
    };

    const handleClick = async () => {
        const noteData = {
            title: currentNote.title,
            description: currentNote.description,
            tag: currentNote.tag
        };

        try {
            await editNote(currentNote.noteId, noteData); 
            refClose.current.click();
            props.showAlert('Blog updated successfully', 'success');
        } catch (error) {
            console.error("Failed to update Blog:", error);
            props.showAlert('Failed to update Blog', 'danger');
        }
    };

    const onChange = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
    };

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Blog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={currentNote.title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={currentNote.description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={currentNote.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row my-3">
                    <h2>All Blogs</h2>
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <NoteItem key={note.noteId} updatedNote={updatedNote} showAlert={props.showAlert} note={note} />
                        ))
                    ) : (
                        <p>No Blogs available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Notes;
