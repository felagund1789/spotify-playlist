# Spotify Playlist Creator

![Spotify](https://img.shields.io/badge/Spotify-1DB954?style=flat-square&logo=spotify&logoColor=white)
![React](https://img.shields.io/badge/-React-000000?style=flat-square&logo=React&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=flat-square&logo=chakraui&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

## Overview

Spotify Playlist Creator is a web application that allows users to create Spotify playlists seamlessly. Built with React, TypeScript, and Chakra UI, this app leverages the Spotify API to provide a smooth and efficient user experience.

## Features

- **Create Playlists:** Easily create new playlists and add your favorite songs.
- **Search Tracks:** Search for songs using the Spotify API and add them to a playlist.
- **Responsive Design:** Enjoy a responsive UI built with Chakra UI, ensuring a great experience on both desktop and mobile devices.

## Tech Stack

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A strongly typed programming language that builds on JavaScript.
- **Chakra UI:** A simple, modular, and accessible component library for React.
- **Spotify API:** An interface for interacting with Spotify's vast music library.
- **Vite:** A fast build tool and development server.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**
```
git clone https://github.com/felagund1789/spotify-playlist.git
cd spotify-playlist
```

2. **Install dependencies:**
```
npm install
```

3. **Create a Spotify app:**
   Create a new app in your [Spotify developer account](https://developer.spotify.com/dashboard) and declare `http://localhost:5173` as a callback URI.

4. **Set up environment variables:**
   Copy the `.env.example` file in the root directory, rename the copied file to `.env` and replace your Spotify API client ID:
```
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/
```

5. **Start the development server:**
```
npm run dev
```
The app should now be running on [http://localhost:5173](http://localhost:5173).

## Usage

1. **Log in to Spotify:**

   Log in using your Spotify account to access and manage your playlists.

2. **Search for tracks:**

   Use the search bar to find songs on Spotify and add them to your list.

3. **Add songs to the list:**

   As you search for tracks, add them to your list.

4. **Save your playlist:**

   Give your playlist a name and select "Save" to save it to your Spotify account.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Open a pull request.

## Contact

If you have any questions or feedback, please feel free to reach out:

- **GitHub Issues:** [Create an issue](https://github.com/felagund1789/spotify-playlist/issues)
- **Email:** raistlindragonl@gmail.com

---

Thank you for using Spotify Playlist Creator! Enjoy your music. 🎵
