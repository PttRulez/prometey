import React, { FC } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { SelectList, SelectOption, SxProp } from '../../../types/common';

export interface SelectProps {
  handleClear: () => void;
  onChange?: (e: SelectChangeEvent) => void;
  label: string;
  options: SelectList | SelectOption[];
  value: any;
  sx: SxProp;
  variant?: 'standard' | 'filled' | 'outlined' | undefined;
}
// onChange field
const SelectInput: FC<SelectProps> = ({
  handleClear,
  onChange,
  label,
  options,
  value,
  variant = 'standard',
  sx,
  ...otherProps
}) => {
  return (
    <FormControl sx={sx} fullWidth {...otherProps}>
      <InputLabel id={label}>{label}</InputLabel>
      <MuiSelect
        labelId={label}
        id={`${label}-Select`}
        value={value}
        label={label}
        onChange={onChange}
        endAdornment={
          <InputAdornment
            position={'end'}
            sx={{
              display: value ? '' : 'none',
              position: 'absolute',
              right: '25px',
            }}
          >
            <IconButton onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        }
        variant={variant}
      >
        {Array.isArray(options)
          ? options.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))
          : Object.entries(options)
              .sort((a, b) => a[1].localeCompare(b[1], 'ru', { numeric: true }))
              .map(([key, value]) => (
                <MenuItem value={key} key={value}>
                  {value}
                </MenuItem>
              ))}
      </MuiSelect>
    </FormControl>
  );
};

export default SelectInput;