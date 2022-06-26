import { useState, useEffect } from "react";

interface Props {
    initialUrl: string;
    initialData: any;
}

const useRemoteService = ({ initialUrl, initialData }: Props) => {
    const [data, setData] = useState<any>(initialData);
    const [url, setUrl] = useState<string>(initialUrl);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchBooks = async () => {
            setError(false);
            setLoading(true);

            try {
                const resp = await fetch(url);
                const data = await resp.json();
                setData(data);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks()
            .catch(err => console.error(err));
    }, [url]);

    return { data, loading, error, setUrl };
}

export default useRemoteService;