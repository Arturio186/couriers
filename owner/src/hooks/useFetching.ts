import { useState, useEffect, useCallback } from "react";

const useFetching = <T>(callback: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await callback();
            setData(result);
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }, [callback]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetching;
