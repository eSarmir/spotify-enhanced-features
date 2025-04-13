'use client';

import { useEffect, useState } from "react";
import SpotifyButton from "./spotify-button";

export default function SpotfyLogin() {

    const clientId = '802d8bc2a51e45f59a8b38a01e206b28';
    const scope = 'user-read-private user-read-email';
    const [challenge, setChallenge] = useState('');
    
    useEffect(() => {
        console.log('useEffect called' + challenge);
        if (challenge === '') {
            getCodeChalenge().then((codeChallenge) => {
                setChallenge(codeChallenge);
            });
        } 
    }, [challenge]);


    async function getCodeChalenge(): Promise<string> {

        const generateRandomString = (length: number) => {
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const values = crypto.getRandomValues(new Uint8Array(length));
            return values.reduce((acc, x) => acc + possible[x % possible.length], "");
        }

        const sha256 = async (plain: string) => {
            const encoder = new TextEncoder()
            const data = encoder.encode(plain)
            return window.crypto.subtle.digest('SHA-256', data)
        }
           
        const base64encode = (input: ArrayBuffer) => {
            return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        }

        const codeVerifier  = generateRandomString(64);
        const hashed = await sha256(codeVerifier)
        const codeChallenge = base64encode(hashed);

        return codeChallenge;
    }

    function Display()
    {
        if (challenge === '') {
            return <div>
                        <p>Loading...</p>
                    </div>
        }

        return (
            <div>
                <p>Client ID:{clientId}</p>
                <p>Scope:{scope}</p>
                <p>Code Challenge:{challenge}</p>
                <br/>
                <p>Click the button below to connect to Spotify.</p>
                <SpotifyButton 
                    clientId={clientId} 
                    scope={scope} 
                    codeChallenge={challenge}
                />
            </div>
        )
    }

    return (
        Display()
    );
}
