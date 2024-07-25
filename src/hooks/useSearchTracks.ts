import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { SearchResponse, Track } from "../types";

const useSearchTracks = (searchTerm: string) => {
  const [data, setData] = useState<Track[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<SearchResponse>(`/search?q=${searchTerm}&type=track`, {
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data.tracks?.items || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [searchTerm]);

  if (!searchTerm) return {
    data: [],
    error: false,
    isLoading: false
  };

  return { data, error, isLoading };
};

export default useSearchTracks;
