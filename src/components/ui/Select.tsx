import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';

interface SelectProps {
  control: Control;
  handleClear: () => void;
  onChange?: (value: any) => void;
  label: string;
  name: string;
  options: SelectOption[];
  value: any;
}

export interface SelectOption {
  title: string;
  value: any;
}

const Select: FC<SelectProps> = ({
  control,
  handleClear,
  onChange,
  label,
  name,
  options,
  value,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl {...props} fullWidth>
          <InputLabel id={label}>{label}</InputLabel>
          <MuiSelect
            {...field}
            labelId={label}
            id={`${label}-Select`}
            value={value}
            label={label}
            onChange={(value) => {
              field.onChange(value);
              if (onChange) {
                onChange(value);
              }
            }}
            endAdornment={
              <IconButton
                sx={{ display: value ? '' : 'none', color: 'primary.main' }}
                onClick={handleClear}
              >
                <ClearIcon />
              </IconButton>
            }
          >
            {options.map((option) => (
              <MenuItem value={option.value} key={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </MuiSelect>
        </FormControl>
      )}
    />
  );
};

export default Select;
