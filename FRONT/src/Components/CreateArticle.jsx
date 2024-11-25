import React, { useState } from 'react';
import axios from 'axios';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/articles', {
            title,
            content,
        }).then(response => {
            console.log(response.data);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            ></textarea>
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateArticle;
