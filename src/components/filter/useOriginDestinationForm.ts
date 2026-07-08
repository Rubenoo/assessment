import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Station } from '../../data/stations/station';
import { resolveFilter, type OriginDestinationFilter } from './originDestinationFilter';

export interface OriginDestinationFormValues {
    origins: Station[];
    destinations: Station[];
    mirror: boolean;
}

interface UseOriginDestinationFormOptions {
    onFilterChange: (filter: OriginDestinationFilter) => void;
}

function useOriginDestinationForm({ onFilterChange }: UseOriginDestinationFormOptions) {
    const { control, watch, getValues, setValue } = useForm<OriginDestinationFormValues>({
        mode: 'onChange',
        defaultValues: { origins: [], destinations: [], mirror: false },
    });

    const origins = watch('origins');
    const destinations = watch('destinations');
    const mirror = watch('mirror');

    const setMirror = (checked: boolean) => {
        setValue('mirror', checked);
        if (checked) {
            setValue('destinations', getValues('origins'), { shouldValidate: true });
        }
    };

    useEffect(() => {
        onFilterChange(resolveFilter(origins, destinations, mirror));
    }, [origins, destinations, mirror, onFilterChange]);

    return { control, mirror, getValues, setMirror };
}

export default useOriginDestinationForm;
