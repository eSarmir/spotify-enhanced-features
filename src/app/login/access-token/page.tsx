'use client';

import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function AccessToken()
{
    const router = useRouter();

    let loaded = false;

    useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const codeVerifier = localStorage.getItem('code_verifier');

		const url = "https://accounts.spotify.com/api/token";

		const params = {
			client_id: '802d8bc2a51e45f59a8b38a01e206b28',
			grant_type: 'authorization_code',
			code: urlParams.get('code')!,
			redirect_uri: 'http://localhost:3000/login/access-token',
			code_verifier: codeVerifier!
		}

		const postParams = new URLSearchParams(params).toString();

		const payload = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: postParams,
			}

		fetch(url, payload).then((body) => {
				body.json().then((json) => {
                    localStorage.setItem('access_token', json.access_token);
                    loaded = true;
                    router.push('/');
				});
			}
		);
	},[loaded])

    return (
        <div>
            {loaded 
                ? <div>Access token loaded</div>
                : <div>Getting the access token...</div>
            }
        </div>
    )
}