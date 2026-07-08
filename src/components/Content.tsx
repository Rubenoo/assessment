import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { spacingTokens } from './theme/spacing';
import StationAutocomplete from './autocomplete/StationAutocomplete';
import MultiOriginDestinationFilter from './filter/MultiOriginDestinationFilter';

function Content() {
    return (
        <Container component="section" maxWidth="sm" sx={{ py: spacingTokens.xl }}>
            <Paper variant="outlined" sx={{ p: spacingTokens.lg }}>
                <Stack sx={{ gap: spacingTokens.md }}>
                    <Box>
                        <Typography variant="h6" component="h2">
                            Plan your journey
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Search one or more origin and destination stations.
                        </Typography>
                    </Box>
                    <MultiOriginDestinationFilter onFilterChange={(filter) => console.log(filter)} />
                    <Divider />
                    <Box>
                        <Typography variant="h6" component="h2">
                            Quick station lookup
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            A single-station search, shown here on its own.
                        </Typography>
                    </Box>
                    <StationAutocomplete />
                </Stack>
            </Paper>
        </Container>
    )
}

export default Content
