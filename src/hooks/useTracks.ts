import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { SearchResponse, Track } from "../types";

const useTracks = (searchTerm: string) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (searchTerm) {
      setLoading(true);
      apiClient
        .get<SearchResponse>(`/search?q=${searchTerm}&type=track`, {
          signal: controller.signal,
        })
        .then((res) => {
          setTracks(res.data.tracks?.items || []);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
    } else {
      setTracks([]);
    }

    return () => controller.abort();
  }, [searchTerm]);

  return { tracks, error, isLoading };
};

export default useTracks;
