import { useState, useEffect, useCallback } from "react";
import { AxiosResponse } from 'axios';

type FetchFunc<T> = (...args: any[]) => Promise<AxiosResponse<T>>;

const useFetching = <T>(fetchFunc: FetchFunc<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (...args: any[]) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchFunc(...args); 
            setData(response.data);
        } catch (err) {
            setError("Произошла ошибка при получении данных");
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
