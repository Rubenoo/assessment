import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Station } from '../../data/stations/station';
import { hasOverlap, resolveFilter, type OriginDestinationFilter } from './originDestinationFilter';

export interface OriginDestinationFormValues {
    origins: Station[];
    destinations: Station[];
    mirror: boolean;
}

interface UseOriginDestinationFormOptions {
    onFilterChange: (filter: OriginDestinationFilter) => void;
}

function useOriginDestinationForm({ onFilterChange }: UseOriginDestinationFormOptions) {
    const { control, watch, getValues, setValue, trigger } = useForm<OriginDestinationFormValues>({
        mode: 'onChange',
        defaultValues: { origins: [], destinations: [], mirror: false },
    });

    const origins = watch('origins');
    const destinations = watch('destinations');
    const mirror = watch('mirror');
    const filter = resolveFilter(origins, destinations, mirror);
    const hasOverlapWarning = hasOverlap(origins, destinations, mirror);

    const setMirror = (checked: boolean) => {
        setValue('mirror', checked);
        if (checked) {
            setValue('destinations', getValues('origins'), { shouldValidate: true });
        } else {
            trigger('destinations');
        }
    };

    useEffect(() => {
        onFilterChange(filter);
    }, [filter, onFilterChange]);

    return { control, mirror, getValues, setMirror, filter, hasOverlapWarning };
}

export default useOriginDestinationForm;
