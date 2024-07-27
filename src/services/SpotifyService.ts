import apiClient from "../services/api-client";
import { SearchResponse } from "../types";

class SpotifyService {

  searchTracks(searchTerm: string) {
    const controller = new AbortController();
    const request = apiClient
      .get<SearchResponse>(`/search?q=${searchTerm}&type=track`, {
        signal: controller.signal,
      })

    return {request, cancel: () => controller.abort()};
  }
}

export default new SpotifyService();
