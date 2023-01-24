import { FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { IconButton, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export interface DatePickerProps {
  error?: boolean;
  handleClear: () => void;
  onChange: (value: any, keyboardInputValue?: string | undefined) => void;
  label: string;
  value: any;
  variant?: 'standard' | 'filled' | 'outlined' | undefined;
}

const DatePickerInput: FC<DatePickerProps> = ({
  error = false,
  handleClear,
  label,
  onChange,
  value,
  variant = 'standard',
  ...otherProps
}) => {
  return (
    <DatePicker
      label={label}
      onChange={(v) => {
          onChange(v.set('hours', 12));
      }}
      value={value}
      InputProps={{
        endAdornment: value && (
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClear}
          >
            <ClearIcon />
          </IconButton>
        ),
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          variant={variant}
          sx={{
            '& .MuiInputBase-root.MuiInput-root': { paddingLeft: '15px' },
            '& label': { marginLeft: '15px' },
          }}
        />
      )}
      {...otherProps}
    />
  );
};

export default DatePickerInput;
