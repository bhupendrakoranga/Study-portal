import React from 'react';
import { TextField, Autocomplete, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

// Styled components
const SearchWrapper = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  .MuiAutocomplete-endAdornment {
    display: none;
  }
`;

const SearchInput = styled(TextField)`
  width: 100%;
  .muiautocomplete-inputroot : {
    padding-right: 0px !important;
  }
  .MuiOutlinedInput-root {
    border-radius: 8px 8px 0px 0px;
    border: 1px 0px 0px 0px;
  }
`;

export interface Option {
  label: string;
  value: string | number;
}

interface SearchFieldWithDropdownProps {
  options: Option[];
  placeholder?: string;
  value: Option | null;
  onChange?: any;
}

const SearchFieldWithDropdown: React.FC<SearchFieldWithDropdownProps> = ({
  options,
  placeholder,
  onChange,
  value = null,
  ...props
}) => {
  console.log(value, 'valuevalue');
  return (
    <SearchWrapper>
      <StyledAutocomplete
        freeSolo
        options={options}
        getOptionLabel={(option: any) => option?.label}
        onChange={onChange} // Pass onChange to Autocomplete
        value={value}
        renderInput={(params) => (
          <SearchInput
            {...params}
            variant="outlined"
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        {...props}
      />
    </SearchWrapper>
  );
};

export default SearchFieldWithDropdown;
