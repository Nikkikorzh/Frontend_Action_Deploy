import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import api from "../api/axios.ts";

function createPost(data: { postName: string; postDescription: string; likes: number; dislikes: number; author: number }) {
    return api.post("/posts/", data).then((res) => {
        console.log(res);
        return res.data;
    });
}

export default function PostsNew() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [author, setAuthor] = useState(0);
    const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createPost({
				postName: title,
				postDescription: description,
				likes,
				dislikes,
				author
			});
			navigate({
				to: '/posts',
				state: { refresh: true } as any
			});

		} catch (error) {
			if (error instanceof Error) {
				alert('Доступ заборонений. Увійдіть у систему.');
			} else {
				alert('Сталася помилка. Спробуйте ще раз.');
			}
		}
	};


	return (
        <form style={{ marginTop: '2rem' }} onSubmit={handleSubmit}>
            <h3 style={{fontFamily:'fantasy'}}>Create New Post</h3>
            <input
                required
                placeholder="Title"
                value={title}
                onChange={(e) => { setTitle(e.target.value); }}
            /><br />
            <textarea
                required
                placeholder="Description"
                style={{ width: '300px', height: '100px' }}
                value={description}
                onChange={(e) => { setDescription(e.target.value); }}
            /><br />
            <input
                type="numeric"
                value={likes}
                onChange={(e) => { setLikes(+e.target.value); }}
            /><br />
            <input
                type="numeric"
                value={dislikes}
                onChange={(e) => { setDislikes(+e.target.value); }}
            /><br />
            <input
                required
                placeholder="Author ID"
                value={author}
                onChange={(e) => { setAuthor(+e.target.value); }}
            /><br />
            <button type="submit" style={{background:'orange', color: 'white',
							borderRadius:'8px', padding:'8px 20px 8px 20px', marginTop:'5px'}}>Add Post</button>
        </form>
    );
}
