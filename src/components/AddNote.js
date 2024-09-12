import React, { useState } from 'react';

const AddNote = () => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [image, setImage] = useState(null);

    const handleClick = async (e) => {
        e.preventDefault();

        const wordCount = note.description.trim().split(/\s+/).length;
        if (wordCount < 100) {
            alert('Description must be at least 100 words.');
            return;
        }

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }

        try {
            const uploadResponse = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error('Image upload failed');
            }

            const uploadData = await uploadResponse.json();
            if (!uploadData.success) {
                throw new Error('Image upload failed');
            }

            const noteData = {
                title: note.title,
                description: note.description,
                tag: note.tag,
                image_url: uploadData.image_url,
            };

            const noteResponse = await fetch('http://localhost:5000/addnote', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            });

            if (!noteResponse.ok) {
                throw new Error('Failed to add note');
            }

            const noteResult = await noteResponse.json();

            if (noteResult.success) {
                alert('Blog added successfully!');
                setNote({ title: "", description: "", tag: "" });
                setImage(null);
            } else {
                alert('Failed to add Blog');
            }
        } catch (error) {
            console.error("Failed to add Blog", error);
            alert('An error occurred: ' + error.message);
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className='container my-3'>
            <h2>ADD A Blog</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor='title' className="form-label">Title</label>
                    <input type="text" id='title' name='title' value={note.title} onChange={onChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor='description' className="form-label">Description</label>
                    <input type="text" id='description' name='description' value={note.description} className="form-control" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor='tag' className="form-label">Tag</label>
                    <input type="text" id='tag' name='tag' value={note.tag} className="form-control" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor='image' className="form-label">Upload Image</label>
                    <input type="file" id='image' name='image' className="form-control" onChange={onImageChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit Note</button>
            </form>
        </div>
    );
};

export default AddNote;
