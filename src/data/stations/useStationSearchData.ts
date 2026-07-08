import { useEffect, useState } from 'react';
import { searchStations, type Station } from './station';

interface UseStationSearchDataOptions {
    onSearch?: (query: string) => Promise<Station[]>;
    debounceMs?: number;
}

function useStationSearchData({ onSearch, debounceMs = 200 }: UseStationSearchDataOptions = {}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState<Station[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            return;
        }

        let stale = false;
        setLoading(true);

        const timeout = setTimeout(() => {
            const search = onSearch ?? searchStations;
            search(query)
                .then((results) => {
                    if (stale) {
                        return;
                    }
                    setOptions(results);
                })
                .catch(() => {
                    if (stale) {
                        return;
                    }
                    setOptions([]);
                })
                .finally(() => {
                    if (!stale) {
                        setLoading(false);
                    }
                });
        }, debounceMs);

        return () => {
            stale = true;
            clearTimeout(timeout);
        };
    }, [open, query, debounceMs, onSearch]);

    return {
        query,
        setQuery,
        options,
        loading,
        open,
        onOpen: () => setOpen(true),
        onClose: () => setOpen(false),
    };
}

export default useStationSearchData;
