import type { SyntheticEvent } from 'react';
import type { Station } from './station';
import useStationSearchData from './useStationSearchData';

export interface UseStationAutocompleteBaseOptions {
    onSearch?: (query: string) => Promise<Station[]>;
    debounceMs?: number;
}

function useStationAutocompleteBase(options: UseStationAutocompleteBaseOptions = {}) {
    const { query, setQuery, options: stations, loading, open, onOpen, onClose } = useStationSearchData(options);

    return {
        query,
        open,
        onOpen,
        onClose,
        inputValue: query,
        onInputChange: (_event: SyntheticEvent, value: string) => setQuery(value),
        options: stations,
        loading,
        filterOptions: (stations: Station[]) => stations,
        getOptionLabel: (station: Station) => station.name,
        isOptionEqualToValue: (station: Station, value: Station) => station.id === value.id,
        noOptionsText: query ? 'No stations found' : 'Start typing to search a station',
        loadingText: 'Searching stations…',
    };
}

export default useStationAutocompleteBase;
