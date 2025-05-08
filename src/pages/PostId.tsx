import {Link, Outlet, useNavigate} from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Route } from "../routes/posts.$id";
import api from '../api/axios.ts';

async function getPostById(id: number) {
		const response = await api.get(`/posts/${id}`);
		return response.data.data;
}


async function updatePost(id: number, data: Partial<{ name: string, description: string, author: number }>) {
		const response = await api.patch(`/posts/${id}`, data);
		return response.data;
}

function MyComponent() {
	return (
		<Link to="/posts/new">
			<button style={{ fontWeight: "bold" }}>Перейти до створення нового елементу</button>
		</Link>
	);
}

export default function PostsId() {
	const { id } = Route.useParams();
	const postId = Number(id);
	const [post, setPost] = useState<any | null>(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPost = async () => {
			const fetchedPost = await getPostById(postId);
			setPost(fetchedPost);
			setTitle(fetchedPost.name);
			setDescription(fetchedPost.description);
		};
		fetchPost();

	}, [postId]);

	const handleUpdate = async () => {
		console.log("Отправка данных:", { name: title, description });

		const updatedPost = await updatePost(postId, {
			name: title,
			description,
		});
		setPost(updatedPost);
		navigate({
			to: '/posts',
			state: { refresh: true } as any
		});
	};

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #29c7d4', padding: '10px', borderRadius: '10px', gap: '10px' }}>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
				<h3 style={{ fontWeight: 'bold' }}>Post-title </h3>
				<input
					required
					placeholder="Title"
					value={title}
					onChange={(e) => { setTitle(e.target.value); }}
				/>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
				<h3 style={{ fontWeight: 'bold' }}>Post-description</h3>
				<textarea
					required
					style={{ width: '300px', height: '100px' }}
					value={description}
					onChange={(e) => { setDescription(e.target.value); }}
				/>
			</div>
			<p>Likes: {post.likes}</p>
			<p>Dislikes: {post.dislikes}</p>
			<MyComponent />
			<button style={{ backgroundColor: "aqua", fontWeight: "15px", padding: "10px", borderRadius: "5px" }} onClick={handleUpdate}>
				Зберегти зміни
			</button>
			<Outlet />
		</div>
	);
}








