import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface MirrorToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

function MirrorToggle({ checked, onChange }: MirrorToggleProps) {
    return (
        <FormControlLabel
            control={<Switch checked={checked} onChange={(_event, value) => onChange(value)} />}
            label="Mirror destinations = origins"
        />
    );
}

export default MirrorToggle;
