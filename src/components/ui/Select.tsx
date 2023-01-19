import { FC } from 'react';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { SelectList, SxProp } from '../../types/common';

interface SelectProps {
  handleClear: () => void;
  onChange?: (value: any) => void;
  label: string;
  options: SelectList;
  value: any;
  sx: SxProp;
}

const FormSelect: FC<SelectProps> = ({
  handleClear,
  onChange,
  label,
  options,
  value,
  sx,
}) => {
  return (
    <FormControl sx={sx} fullWidth>
      <InputLabel id={label}>{label}</InputLabel>
      <MuiSelect
        labelId={label}
        id={`${label}-Select`}
        value={value}
        label={label}
        onChange={onChange}
        endAdornment={
          <IconButton
            sx={{ display: value ? '' : 'none', color: 'primary.main' }}
            onClick={handleClear}
          >
            <ClearIcon />
          </IconButton>
        }
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem value={key} key={value}>
            {value}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default FormSelect;
