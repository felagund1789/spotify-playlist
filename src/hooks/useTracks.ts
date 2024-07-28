import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import { Track } from "../types";
import SpotifyService from "../services/SpotifyService";

const useTracks = (searchTerm: string) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { request, cancel } = SpotifyService.searchTracks(searchTerm);

    if (searchTerm) {
      setLoading(true);
      request
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

    return () => cancel();
  }, [searchTerm]);

  return { tracks, error, isLoading };
};

export default useTracks;
