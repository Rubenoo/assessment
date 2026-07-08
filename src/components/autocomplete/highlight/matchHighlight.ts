export interface MatchPart {
    text: string;
    matched: boolean;
}

export function getMatchParts(text: string, query: string): MatchPart[] {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
        return [{ text, matched: false }];
    }

    const lowerText = text.toLowerCase();
    const lowerQuery = normalizedQuery.toLowerCase();

    const parts: MatchPart[] = [];
    let cursor = 0;

    while (cursor < text.length) {
        const matchIndex = lowerText.indexOf(lowerQuery, cursor);

        if (matchIndex === -1) {
            parts.push({ text: text.slice(cursor), matched: false });
            break;
        }

        if (matchIndex > cursor) {
            parts.push({ text: text.slice(cursor, matchIndex), matched: false });
        }

        parts.push({ text: text.slice(matchIndex, matchIndex + normalizedQuery.length), matched: true });
        cursor = matchIndex + normalizedQuery.length;
    }

    return parts;
}
