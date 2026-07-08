import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import type { Station } from '../../data/stations/station';
import useStationSearchData from '../../data/stations/useStationSearchData';
import StationLabel from '../autocomplete/StationLabel';

interface StationMultiAutocompleteProps {
    label: string;
    placeholder?: string;
    value: Station[];
    onChange: (stations: Station[]) => void;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
}

function StationMultiAutocomplete({
    label,
    placeholder,
    value,
    onChange,
    disabled,
    error,
    helperText,
}: StationMultiAutocompleteProps) {
    const { query, setQuery, options, loading, open, onOpen, onClose } = useStationSearchData();

    return (
        <Autocomplete<Station, true>
            multiple
            disabled={disabled}
            filterSelectedOptions
            disableCloseOnSelect
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            inputValue={query}
            onInputChange={(_event, newQuery) => setQuery(newQuery)}
            options={options}
            loading={loading}
            filterOptions={(x) => x}
            value={value}
            onChange={(_event, stations) => onChange(stations)}
            getOptionLabel={(station) => station.name}
            isOptionEqualToValue={(station, other) => station.id === other.id}
            noOptionsText={query ? 'No stations found' : 'Start typing to search a station'}
            loadingText="Searching stations…"
            renderOption={(props, station) => (
                <Box component="li" {...props} key={station.id}>
                    <StationLabel station={station} query={query} />
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    error={error}
                    helperText={helperText}
                />
            )}
        />
    );
}

export default StationMultiAutocomplete;
