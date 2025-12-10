# Spotify Authorization Flow - PKCE Implementation

This project now uses the **Authorization Code with PKCE (Proof Key for Code Exchange)** flow for Spotify authentication, which is more secure than the previously used Implicit Grant flow.

## How it works

1. **Code Challenge Generation**: When authentication is needed, the app generates a random code verifier and creates a SHA256 hash (code challenge)
2. **Authorization Request**: User is redirected to Spotify with the code challenge
3. **Code Exchange**: After user approval, Spotify redirects back with an authorization code
4. **Token Exchange**: The app exchanges the authorization code + code verifier for access and refresh tokens
5. **Token Management**: Tokens are stored securely and automatically refreshed when needed

## Key Features

- ✅ Secure PKCE flow implementation
- ✅ Automatic token refresh
- ✅ Persistent token storage (localStorage)
- ✅ Automatic token inclusion in API requests
- ✅ Error handling and retry logic
- ✅ Clean URL management (removes auth parameters after processing)

## Environment Variables Required

Make sure you have these environment variables set:
- `VITE_SPOTIFY_CLIENT_ID`: Your Spotify app's client ID
- `VITE_SPOTIFY_REDIRECT_URI`: The redirect URI registered in your Spotify app

## Usage

The authentication is handled automatically by the API client. When making requests:

```typescript
import apiClient from './services/api-client';

// Token is automatically included
const response = await apiClient.get('/me');
```

The system will automatically:
- Get a fresh token if none exists
- Refresh expired tokens
- Handle authentication errors
- Redirect to login when needed

## Logout

To logout and clear all stored tokens:

```typescript
import { logout } from './services/AccessToken';

logout();
```