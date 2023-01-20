import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import { SelectList } from '../../../types/common';

interface FormSelectProps {
  control: Control;
  handleClear: () => void;
  onChange?: (value: any) => void;
  label: string;
  name: string;
  options: SelectList;
  value: any;
}

const FormSelect: FC<FormSelectProps> = ({
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
          <Select
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
                sx={{ display: value ? '' : 'none' }}
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
          </Select>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
