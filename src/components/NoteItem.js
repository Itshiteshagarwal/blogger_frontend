import React, { useContext } from 'react';
import noteContext from '../context/Notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updatedNote } = props;

    return (
        <div className='col-md-12'>
            <div className="card my-3">
                {/* Conditionally render the image if it exists */}
                {note.image && (
                    <img
                        src={note.image}
                        className="card-img-top"
                        alt={note.title}
                        style={{ maxHeight: "300px",margin:"10px", objectFit:"contain" }} 
                    />
                )}
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i 
                        className="fa-solid fa-trash mx-2"
                        onClick={() => {
                            deleteNote(note.noteId);
                            props.showAlert('Blog deleted successfully', 'danger');
                        }}
                        role="button"
                        aria-label="Delete note"
                    ></i>
                    <i 
                        className="fa-regular fa-pen-to-square mx-2"
                        onClick={() => { updatedNote(note); }}
                        role="button"
                        aria-label="Edit note"
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
