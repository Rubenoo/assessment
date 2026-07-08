import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import type { Station } from '../../data/stations/station';
import useStationAutocompleteBase, {
    type UseStationAutocompleteBaseOptions,
} from '../../data/stations/useStationAutocompleteBase';
import StationLabel from '../autocomplete/StationLabel';

interface StationMultiAutocompleteProps extends UseStationAutocompleteBaseOptions {
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
    onSearch,
    debounceMs,
}: StationMultiAutocompleteProps) {
    const { query, ...autocompleteProps } = useStationAutocompleteBase({ onSearch, debounceMs });

    return (
        <Autocomplete<Station, true>
            {...autocompleteProps}
            multiple
            disabled={disabled}
            filterSelectedOptions
            disableCloseOnSelect
            value={value}
            onChange={(_event, stations) => onChange(stations)}
            renderOption={(props, station) => (
                <Box component="li" {...props} key={station.id}>
                    <StationLabel station={station} query={query} />
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={disabled ? undefined : placeholder}
                    error={error}
                    helperText={helperText}
                />
            )}
        />
    );
}

export default StationMultiAutocomplete;
