import { Outlet, Link,  useLocation } from "@tanstack/react-router";
import { useEffect, useState } from 'react';
import api from "../api/axios.ts";



interface Post {
	id: number;
	name: string;
	description: string;
	author: string;
	likes: number;
	dislikes: number;
}

async function getAllPosts(): Promise<Array<Post>> {
	const response = await api.get("/posts");
	return response.data.data;
}


async function deletePost(id: number) {
	return api.delete(`/posts/${id}`);
}


// function getPostById(id: number) {
// 	return posts.find(post => post.id === id);
// }

export default function Posts() {
	const [posts, setPosts] = useState<Array<Post>>([]);

	const location = useLocation() as any;

	const handleDelete = async (id: number) => {
			try {
				await deletePost(id);
				setPosts((previousPosts) => previousPosts.filter((post) => post.id !== id));
			} catch (error: unknown) {
				const err = error as { response?: { status?: number } };
				if (err.response?.status === 401 || err.response?.status === 403) {
					alert('Доступ заборонений. Увійдіть у систему.');
				} else {
					alert('Сталася помилка. Спробуйте ще раз.');
				}
			}


	};

	// const fetchData = async () => {
	// 	try {
	// 		console.log("Fetching posts...");
	// 		const data = await getAllPosts();
	// 		console.log("Fetched posts:", data);
	// 		setPosts(data);
	// 	} catch (error) {
	// 		console.error("Failed to fetch posts:", error);
	// 	}
	// };


	useEffect(() => {
		console.log("Useffect 1")
		const fetchData = async () => {
			const data = await getAllPosts();
			setPosts(data);

		};
		if (location.state?.refresh) {
			fetchData();
		}
	}, [location.state]);

	// useEffect(() => {
	// 	console.log("Useffect 2")
	// 	const fetchData = async () => {
	// 		const data = await getAllPosts();
	// 		console.log("Fetched data:", data);
	// 		setPosts(data);
	// 	};
	// 	fetchData();
	// }, []);


	return (
		<div style={{ padding: '1rem' }}>
			<h2 style={{fontWeight:"bold"}}>All Posts</h2>
			<Link to="/posts/new">
				<button style={{ marginBottom: '1rem', background:"yellow", padding:'0.5rem', borderRadius:'12px',
					fontFamily:"roboto" }}>Створити новий пост</button>
			</Link>
			{posts.map((post) => (
				<div key={post.id} style={{
					border: '1px solid #ccc',
					borderRadius: '8px',
					padding: '12px',
					marginBottom: '10px',
					backgroundColor: '#f9f9f9',
				}}>
					<h3 style={{ color: '#0a5cc2', fontWeight: 'bold' }}>{post.name}</h3>
					<p>{post.description}</p>
					<p>Автор: {post.author}</p>
					<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
						<span>Likes - {post.likes} | Dislikes - {post.dislikes}</span>
					</div>
					<div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
						<Link to={`/posts/${post.id}`}>
							<button style={{backgroundColor:'black', color:'white', padding:'8px', borderRadius:'8px'}}>
								Переглянути!
							</button>
						</Link>
						<button
							style={{ background:'orange', color: 'white', padding:'8px', borderRadius:'8px' }}
							onClick={() => handleDelete(post.id)}
						> Видалити
						</button>
					</div>
				</div>
			))}
			<Outlet />
		</div>
	);
}






