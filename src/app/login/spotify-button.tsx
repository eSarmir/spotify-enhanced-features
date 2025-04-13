'use client'

import { useRouter } from "next/navigation";

export default function SpotifyButton(
    {clientId, scope, codeChallenge}: 
    {clientId: string, scope: string, codeChallenge: string}) {

    const router = useRouter();

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    
    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: 'http://localhost:3000/',
    }

    authUrl.search = new URLSearchParams(params).toString();

    return (
        <div>
            <button type="button" onClick={() => router.push(authUrl.toString())}>
                Connect to Spotify
            </button>
        </div>
    );
}