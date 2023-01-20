import { FC, HTMLInputTypeAttribute } from 'react';
import { Control, Controller } from 'react-hook-form';
import { IconButton, styled, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

type FormTextProps = {
  control: Control;
  handleClear?: () => void;
  onChange?: (value: any) => void;
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  variant?: 'standard' | 'filled' | 'outlined' | undefined;
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: '500px',
}));

const FormText: FC<FormTextProps> = ({
  control,
  handleClear,
  onChange,
  label,
  name,
  type = 'text',
  value,
  variant = 'standard',
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <StyledTextField
          {...props}
          {...field}
          fullWidth
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
          label={label}
          onChange={(value) => {
            field.onChange(value);
            if (onChange) {
              onChange(value);
            }
          }}
          type={type}
          value={value}
          variant={variant}
        />
      )}
    />
  );
};

export default FormText;
