import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { spacingTokens } from '../theme/spacing';
import type { Station } from '../../data/stations/station';
import useStationSearchData from '../../data/stations/useStationSearchData';
import HighlightedText from './highlight/HighlightedText';

function StationAutocomplete() {
    const { query, setQuery, options, loading, open, onOpen, onClose } = useStationSearchData();

    return (
        <Autocomplete<Station>
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            inputValue={query}
            onInputChange={(_event, value) => setQuery(value)}
            options={options}
            loading={loading}
            filterOptions={(x) => x}
            groupBy={(station) => station.group}
            getOptionLabel={(station) => station.name}
            isOptionEqualToValue={(station, value) => station.id === value.id}
            noOptionsText={query ? 'No stations found' : 'Start typing to search a station'}
            loadingText="Searching stations…"
            renderOption={(props, station) => (
                <Stack
                    component="li"
                    {...props}
                    key={station.id}
                    direction="row"
                    sx={{ gap: spacingTokens.sm }}
                >
                    <HighlightedText text={station.name} query={query} />
                    <HighlightedText text={station.code} query={query} variant="secondary" />
                </Stack>
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
