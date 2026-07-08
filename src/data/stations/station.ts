export interface Station {
    id: string;
    name: string;
    code: string;
    group: string;
}

export const mockStations: Station[] = [
    { id: 'ber', name: 'Berlin Hauptbahnhof', code: 'BER', group: 'Germany' },
    { id: 'muc', name: 'Munich Hauptbahnhof', code: 'MUC', group: 'Germany' },
    { id: 'fra', name: 'Frankfurt Hauptbahnhof', code: 'FRA', group: 'Germany' },
    { id: 'lon', name: 'London St Pancras', code: 'LON', group: 'United Kingdom' },
    { id: 'man', name: 'Manchester Piccadilly', code: 'MAN', group: 'United Kingdom' },
    { id: 'par', name: 'Paris Gare du Nord', code: 'PAR', group: 'France' },
    { id: 'lyo', name: 'Lyon Part-Dieu', code: 'LYO', group: 'France' },
    { id: 'ams', name: 'Amsterdam Centraal', code: 'AMS', group: 'Netherlands' },
    { id: 'rtm', name: 'Rotterdam Centraal', code: 'RTM', group: 'Netherlands' },
    { id: 'utc', name: 'Utrecht Centraal', code: 'UTC', group: 'Netherlands' },
    { id: 'bru', name: 'Brussels Central', code: 'BRU', group: 'Belgium' },
    { id: 'ant', name: 'Antwerp Central', code: 'ANT', group: 'Belgium' },
    { id: 'mad', name: 'Madrid Atocha', code: 'MAD', group: 'Spain' },
    { id: 'bcn', name: 'Barcelona Sants', code: 'BCN', group: 'Spain' },
    { id: 'mil', name: 'Milan Centrale', code: 'MIL', group: 'Italy' },
    { id: 'rom', name: 'Roma Termini', code: 'ROM', group: 'Italy' },
    { id: 'vie', name: 'Vienna Hauptbahnhof', code: 'VIE', group: 'Austria' },
    { id: 'zur', name: 'Zürich Hauptbahnhof', code: 'ZUR', group: 'Switzerland' },
];

export function searchStations(query: string): Promise<Station[]> {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
        return Promise.resolve(mockStations);
    }

    const results = mockStations.filter(
        (station) =>
            station.name.toLowerCase().includes(normalized) ||
            station.code.toLowerCase().includes(normalized),
    );

    return Promise.resolve(results);
}
