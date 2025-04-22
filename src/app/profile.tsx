'use client'

import { useEffect, useState } from "react";

interface ProfileData {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: {
        url: string;
        height: number;
        width: number;
    }[];
    product: string;
    type: string;
    uri: string;
}

export default function Profile()
{
    const url = "https://api.spotify.com/v1/me";

    const [profileData, setProfileData] = useState<ProfileData | null>(null);

    useEffect(() => {

        if (profileData !== null)
        {
            return;
        }

        const accessToken = localStorage.getItem('access_token');

        const payload = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        }

        fetch(url, payload).then((body) => {
            body.json().then((json) => {
                setProfileData(json);
            });
        });
    }
    ,[profileData]);

    return (
        <div>
            <p>Display name: {profileData?.display_name}</p>
            <p>Email: {profileData?.email}</p>
            <p>Followers: {profileData?.followers.total}</p>
        </div>
    )
}