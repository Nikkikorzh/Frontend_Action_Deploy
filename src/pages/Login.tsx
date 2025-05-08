import api from "../api/axios.ts";
import { useState } from "react";
import {useNavigate} from "@tanstack/react-router";

function userLogin(data: { email: string; password:string }) {
	return api.post("/auth/login", data).then((res) => {
		const token = res.data.data;
		console.log(token);
		localStorage.setItem("Saved token", token);
		return res.data;
	});
}


export default function Login() {
	const [userEmail, setEmail] = useState('')
	const [userPassword, setPassword] = useState('');
	const navigate = useNavigate();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>)  => {
		e.preventDefault();
		userLogin({ email: userEmail, password: userPassword });
		navigate({
			to: '/posts',
			search: {
				refresh: 'true',
			},
		});
	}
	return (
		<div>
			<form onSubmit={handleSubmit} style={{display:"flex",justifyContent:'center', alignItems:'center',
			margin:'50px', border:'2px solid green', }}>
				<div style = {{ padding: '1rem', justifyContent:'center', alignItems:'center' }}>
						<h3 style={{fontWeight:'bold'}}>Insert your login and password!</h3>
						<div style = {{marginTop:'1rem', marginBottom:'1rem'}}>
							<label >Email</label>
							<input required
										 placeholder="Email"
										 type={"email"}
										 value={userEmail}
										 style={{marginLeft:'10px', border:'1px solid white', backgroundColor:'lightgray'}}
										 onChange={(e) => { setEmail(e.target.value); }}/>
						</div>
					<div style={{justifyContent:'center', alignItems:'center',marginTop:'20px'}}>
						<label>Password</label>
						<input required
									 placeholder="Password"
									 type={"password"}
									 value={userPassword}
									 style={{marginLeft:'10px', border:'1px solid white', backgroundColor:'lightgray'}}
									 onChange={(e) => { setPassword(e.target.value); }}/>
					</div>
					<div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
					<button type={"submit"} style={{marginTop:'20px', background:'orange', color: 'white',
						borderRadius:'8px', padding:'8px 20px 8px 20px'}}>Залогиниться</button>
					</div>
				</div>
			</form>
		</div>
	);
}






