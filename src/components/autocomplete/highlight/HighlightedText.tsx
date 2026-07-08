import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getMatchParts } from './matchHighlight';

interface HighlightedTextProps {
    text: string;
    query: string;
    variant?: 'primary' | 'secondary';
}

function HighlightedText({ text, query, variant = 'primary' }: HighlightedTextProps) {
    return (
        <Typography
            component="span"
            variant={variant === 'primary' ? 'body1' : 'body2'}
        >
            {getMatchParts(text, query).map((part, index) => (
                <Box key={index} component="span" sx={{ fontWeight: part.matched ? 700 : 400 }}>
                    {part.text}
                </Box>
            ))}
        </Typography>
    );
}

export default HighlightedText;
