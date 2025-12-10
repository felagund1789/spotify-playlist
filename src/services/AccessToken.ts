const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  expires_at: number;
}

let tokenData: TokenData | null = null;

// PKCE helper functions
const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input: ArrayBuffer): string => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
  const hashed = await sha256(codeVerifier);
  return base64encode(hashed);
};

// Storage helpers
const STORAGE_KEYS = {
  CODE_VERIFIER: 'spotify_code_verifier',
  TOKEN_DATA: 'spotify_token_data'
};

const storeCodeVerifier = (codeVerifier: string): void => {
  sessionStorage.setItem(STORAGE_KEYS.CODE_VERIFIER, codeVerifier);
};

const getStoredCodeVerifier = (): string | null => {
  return sessionStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);
};

const clearStoredCodeVerifier = (): void => {
  sessionStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
};

const storeTokenData = (data: TokenData): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN_DATA, JSON.stringify(data));
};

const getStoredTokenData = (): TokenData | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.TOKEN_DATA);
  return stored ? JSON.parse(stored) : null;
};

const clearStoredTokenData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN_DATA);
};

// Token exchange function
const exchangeCodeForToken = async (code: string): Promise<TokenData> => {
  const codeVerifier = getStoredCodeVerifier();
  if (!codeVerifier) {
    throw new Error('Code verifier not found');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  const data = await response.json();
  
  const tokenData: TokenData = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
    expires_at: Date.now() + (data.expires_in * 1000)
  };

  storeTokenData(tokenData);
  clearStoredCodeVerifier();
  
  return tokenData;
};

// Refresh token function
const refreshAccessToken = async (refreshToken: string): Promise<TokenData> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  
  const tokenData: TokenData = {
    access_token: data.access_token,
    refresh_token: data.refresh_token || refreshToken, // Keep old refresh token if not provided
    expires_in: data.expires_in,
    expires_at: Date.now() + (data.expires_in * 1000)
  };

  storeTokenData(tokenData);
  
  return tokenData;
};

// Check if token is expired
const isTokenExpired = (tokenData: TokenData): boolean => {
  return Date.now() >= tokenData.expires_at - 60000; // Refresh 1 minute before expiry
};

// Main function to get access token
const getAccessToken = async (): Promise<string> => {
  // Check if we have a valid token in memory
  if (tokenData && !isTokenExpired(tokenData)) {
    return tokenData.access_token;
  }

  // Check for stored token
  const storedTokenData = getStoredTokenData();
  if (storedTokenData && !isTokenExpired(storedTokenData)) {
    tokenData = storedTokenData;
    return tokenData.access_token;
  }

  // Try to refresh token if we have a refresh token
  if (storedTokenData?.refresh_token) {
    try {
      tokenData = await refreshAccessToken(storedTokenData.refresh_token);
      return tokenData.access_token;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      clearStoredTokenData();
    }
  }

  // Check for authorization code in URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const error = urlParams.get('error');

  if (error) {
    console.error('Authorization error:', error);
    window.history.replaceState({}, document.title, window.location.pathname);
    throw new Error(`Authorization failed: ${error}`);
  }

  if (code) {
    try {
      tokenData = await exchangeCodeForToken(code);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return tokenData.access_token;
    } catch (error) {
      console.error('Failed to exchange code for token:', error);
      window.history.replaceState({}, document.title, window.location.pathname);
      throw error;
    }
  }

  // No token available, start authorization flow
  await startAuthorizationFlow();
  // This will redirect, so we shouldn't reach this point
  throw new Error('Authorization flow initiated');
};

// Start the authorization flow
const startAuthorizationFlow = async (): Promise<void> => {
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  
  storeCodeVerifier(codeVerifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    scope: 'playlist-modify-public'
  });

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  window.location.href = authUrl;
};

// Logout function to clear tokens
const logout = (): void => {
  tokenData = null;
  clearStoredTokenData();
  clearStoredCodeVerifier();
};

export { logout };
export default getAccessToken;