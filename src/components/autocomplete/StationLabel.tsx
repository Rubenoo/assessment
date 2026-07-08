import Stack from '@mui/material/Stack';
import { spacingTokens } from '../theme/spacing';
import type { Station } from '../../data/stations/station';
import HighlightedText from './highlight/HighlightedText';

interface StationLabelProps {
    station: Station;
    query: string;
}

function StationLabel({ station, query }: StationLabelProps) {
    return (
        <Stack direction="row" sx={{ gap: spacingTokens.sm }}>
            <HighlightedText text={station.name} query={query} />
            <HighlightedText text={station.code} query={query} variant="secondary" />
        </Stack>
    );
}

export default StationLabel;
