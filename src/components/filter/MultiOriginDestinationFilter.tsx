import { Controller } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { spacingTokens } from '../theme/spacing';
import StationMultiAutocomplete from './StationMultiAutocomplete';
import MirrorToggle from './MirrorToggle';
import useOriginDestinationForm from './useOriginDestinationForm';
import { hasOverlap, type OriginDestinationFilter } from './originDestinationFilter';

interface MultiOriginDestinationFilterProps {
    onFilterChange: (filter: OriginDestinationFilter) => void;
}

function MultiOriginDestinationFilter({ onFilterChange }: MultiOriginDestinationFilterProps) {
    const { control, mirror, getValues, setMirror } = useOriginDestinationForm({ onFilterChange });

    return (
        <Stack sx={{ gap: spacingTokens.md }}>
            <Controller
                name="origins"
                control={control}
                render={({ field }) => (
                    <StationMultiAutocomplete
                        label="Origin(s)"
                        placeholder="e.g. Amsterdam or AMS"
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                name="destinations"
                control={control}
                rules={{
                    validate: {
                        noOverlapWithOrigins: (destinations) =>
                            mirror ||
                            !hasOverlap(getValues('origins'), destinations) ||
                            "A destination can't also be an origin",
                    },
                }}
                render={({ field, fieldState }) => (
                    <StationMultiAutocomplete
                        label="Destination(s)"
                        placeholder="e.g. Rotterdam or RTM"
                        value={mirror ? getValues('origins') : field.value}
                        onChange={field.onChange}
                        disabled={mirror}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                name="mirror"
                control={control}
                render={({ field }) => (
                    <MirrorToggle checked={field.value} onChange={setMirror} />
                )}
            />
        </Stack>
    );
}

export default MultiOriginDestinationFilter;
