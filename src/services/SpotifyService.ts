import apiClient from "../services/api-client";
import { Playlist, ProfileResponse, SearchResponse } from "../types";

class SpotifyService {
  searchTracks(searchTerm: string) {
    const controller = new AbortController();
    const request = apiClient.get<SearchResponse>(
      `/search?q=${searchTerm}&type=track`,
      {
        signal: controller.signal,
      }
    );

    return { request, cancel: () => controller.abort() };
  }

  getUserProfile() {
    const controller = new AbortController();
    const request = apiClient.get<ProfileResponse>("/me", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  createPlaylist(userId: string, playlistName: string) {
    return apiClient.post<Playlist>(`users/${userId}/playlists`, {
      name: playlistName,
    });
  }

  addItemsToPlaylist(playlistId: string, itemIds: string[]) {
    return apiClient.post(`playlists/${playlistId}/tracks`, {
      playlist_id: playlistId,
      uris: itemIds,
    });
  }
}

export default new SpotifyService();
