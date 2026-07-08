import type { Station } from '../../data/stations/station';

export interface OriginDestinationFilter {
    origins: Station[];
    destinations: Station[];
}

export function hasOverlap(origins: Station[], destinations: Station[], mirror: boolean): boolean {
    if (mirror) {
        return false;
    }

    const originIds = new Set(origins.map((station) => station.id));
    const destinationIds = new Set(destinations.map((station) => station.id));
    return !originIds.isDisjointFrom(destinationIds);
}

export function resolveFilter(
    origins: Station[],
    destinations: Station[],
    mirror: boolean,
): OriginDestinationFilter {
    return { origins, destinations: mirror ? origins : destinations };
}

export function describeFilter(filter: OriginDestinationFilter): string {
    if (filter.origins.length === 0 || filter.destinations.length === 0) {
        return 'Pick at least one origin and destination to see your journey.';
    }

    const origins = filter.origins.map((station) => station.name).join(', ');
    const destinations = filter.destinations.map((station) => station.name).join(', ');
    return `${origins} → ${destinations}`;
}
