import { FC, HTMLInputTypeAttribute } from 'react';
import { IconButton, styled, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export interface TextInputProps {
  handleClear?: () => void;
  onChange?: (value: any) => void;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  variant?: 'standard' | 'filled' | 'outlined' | undefined;
}
const StyledTextField = styled(TextField)(({ theme }) => ({
  // '& .MuiInput-root': {
  //   minHeight: '40px',
  // },
}));

const FormText: FC<TextInputProps> = ({
  handleClear,
  onChange,
  label,
  type = 'text',
  value,
  variant = 'standard',
  ...otherProps
}) => {
  return (
    // <FormControl fullWidth>
    //   <InputLabel id={label}>{label}</InputLabel>
    <StyledTextField
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
      onChange={onChange}
      type={type}
      value={value}
      variant={variant}
      {...otherProps}
    />
    // </FormControl>
  );
};

export default FormText;
