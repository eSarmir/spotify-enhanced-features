'use client';

import App from "./app";
import Login from "./login/page";

export default function Home() {

	function Display() {

		if (ShouldDisplayApp())
		{
			return <App />
		}

		return <Login />
	}

	function ShouldDisplayApp() {
		return localStorage.getItem('access_token') !== null
	}

  	return (
      <div>
        {Display()}
      </div>
  	);
}