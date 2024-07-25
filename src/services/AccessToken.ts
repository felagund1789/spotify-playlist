const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
let accessToken: string;

const getAccessToken = () => {
  if (accessToken) {
    return accessToken;
  }

  // Check for access token match in URL
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);

    // Clear the parameters from the URL
    window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
    window.history.pushState("Access Token", "", "/");
    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location.href = accessUrl;
  }
};

export default getAccessToken;