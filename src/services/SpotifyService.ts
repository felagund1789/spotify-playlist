import apiClient from "../services/api-client";
import { ProfileResponse, SearchResponse } from "../types";

class SpotifyService {

  searchTracks(searchTerm: string) {
    const controller = new AbortController();
    const request = apiClient
      .get<SearchResponse>(`/search?q=${searchTerm}&type=track`, {
        signal: controller.signal,
      })

    return {request, cancel: () => controller.abort()};
  }

  getUserProfile() {
    const controller = new AbortController();
    const request = apiClient
      .get<ProfileResponse>("/me", {
        signal: controller.signal,
      })

    return {request, cancel: () => controller.abort()};
  }
}

export default new SpotifyService();
