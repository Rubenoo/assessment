import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { spacingTokens } from '../theme/spacing';
import { describeFilter, type OriginDestinationFilter } from './originDestinationFilter';

interface OriginDestinationSummaryProps {
    filter: OriginDestinationFilter;
    hasOverlapWarning: boolean;
}

function OriginDestinationSummary({ filter, hasOverlapWarning }: OriginDestinationSummaryProps) {
    return (
        <Stack sx={{ gap: spacingTokens.xs }}>
            <Typography variant="body2" color="text.secondary">
                {describeFilter(filter)}
            </Typography>
            {hasOverlapWarning && (
                <Typography variant="body2" color="warning.main">
                    A station appears in both origins and destinations.
                </Typography>
            )}
        </Stack>
    );
}

export default OriginDestinationSummary;
