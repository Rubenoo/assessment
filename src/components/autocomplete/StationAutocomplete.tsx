import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import type { Station } from '../../data/stations/station';
import useStationAutocompleteBase, {
    type UseStationAutocompleteBaseOptions,
} from '../../data/stations/useStationAutocompleteBase';
import StationLabel from './StationLabel';

type StationAutocompleteProps = UseStationAutocompleteBaseOptions;

function StationAutocomplete({ onSearch, debounceMs }: StationAutocompleteProps = {}) {
    const { query, ...autocompleteProps } = useStationAutocompleteBase({ onSearch, debounceMs });

    return (
        <Autocomplete<Station>
            {...autocompleteProps}
            groupBy={(station) => station.group}
            renderOption={(props, station) => (
                <Box component="li" {...props} key={station.id}>
                    <StationLabel station={station} query={query} />
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search station"
                    placeholder="e.g. Amsterdam or AMS"
                />
            )}
        />
    );
}

export default StationAutocomplete;
