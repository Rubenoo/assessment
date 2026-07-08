import type { Station } from '../../data/stations/station';

export interface OriginDestinationFilter {
    origins: Station[];
    destinations: Station[];
}

export function hasOverlap(origins: Station[], destinations: Station[]): boolean {
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
