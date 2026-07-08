import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { spacingTokens } from './theme/spacing';
import StationAutocomplete from './autocomplete/StationAutocomplete';
import MultiOriginDestinationFilter from './filter/MultiOriginDestinationFilter';

function Content() {
    return (
        <Container component="section" maxWidth="sm">
            <Stack sx={{ gap: spacingTokens.xl }}>
                <StationAutocomplete />
                <MultiOriginDestinationFilter onFilterChange={(filter) => console.log(filter)} />
            </Stack>
        </Container>
    )
}

export default Content
