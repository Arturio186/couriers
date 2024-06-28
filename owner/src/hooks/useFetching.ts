import { useState, useEffect, useCallback } from "react";
import { AxiosResponse } from 'axios';

const useFetching = <T>(fetchFunc: () => Promise<AxiosResponse<T>>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchFunc();
            setData(response.data);
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }, [fetchFunc]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, setData, loading, error, refetch: fetchData };
};

export default useFetching;
