import React from 'react';
import styled from '@emotion/styled';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { DARK_BLUE, WHITE, NEUTRALS_GREY4, BLACK_TEXT } from '@/styles/color';
import {
  typographyBody1Semibold,
  typographyBody2,
  typographyH6SemiBold,
} from '@/styles/typography';
import Checkbox from '../ui/inputs/Checkbox';
import InputBox from '../ui/inputs/InputBox';
import { mqMax } from '@/styles/base';
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  background: ${WHITE};
  ${mqMax.max} {
    width: 280px;
  }
  border-left: 1px solid #e0e0e0;
`;

export const Header = styled.div`
  background-color: ${DARK_BLUE};
  color: ${WHITE};
  padding: 16px;
  height: 56px;
  ${typographyBody1Semibold}
`;

const SearchInputConatiner = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${NEUTRALS_GREY4};
  & input {
    border: none;
    border-radius: 0;
  }
`;

const List = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ListItemCheckbox = styled.div`
  flex: 1;
  margin-left: 10px;
  & .MuiTypography-body1 {
    color: ${BLACK_TEXT};
    ${typographyBody2} !important;
    font-weight: 400 !important;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const SelectAllFooter = styled.div`
  padding: 10px;
  text-align: center;
  border-top: 1px solid #e0e0e0;
  background: ${NEUTRALS_GREY4};
  button {
    color: ${BLACK_TEXT};
    ${typographyH6SemiBold};
    text-transform: capitalize;
  }
`;

type Item = {
  name: string;
  email?: string;
  selected: boolean;
};

type ListSectionProps = {
  title: string;
  items: Item[];
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onToggleSelect: (name: any) => void;
};

const ListSection: React.FC<ListSectionProps> = ({
  title,
  items,
  searchValue,
  onSearchChange,
  onSelectAll,
  onDeselectAll,
  onToggleSelect,
}) => {
  const allSelected = items.length > 0 && items.every((item) => item.selected);

  return (
    <Column>
      <Header>{title}</Header>
      <SearchInputConatiner>
        <InputBox
          placeholder="Search"
          value={searchValue}
          onChange={onSearchChange}
          id={title}
          name={title}
          icon={<SearchIcon style={{ fill: NEUTRALS_GREY4 }} />}
        />
      </SearchInputConatiner>
      <List>
        {items.map((item, index) => (
          <ListItem key={item.name + index}>
            <ListItemCheckbox>
              <Checkbox
                checked={item.selected}
                onChange={() => onToggleSelect(item.email)}
                label={item.name ?? item.email}
              />
            </ListItemCheckbox>
            <Actions>
              <IconButton size="small">
                <EditIcon fontSize="small" style={{ fill: NEUTRALS_GREY4 }} />
              </IconButton>
            </Actions>
          </ListItem>
        ))}
      </List>
      <SelectAllFooter>
        <Button
          variant="text"
          onClick={allSelected ? onDeselectAll : onSelectAll}
        >
          {allSelected ? 'Deselect All' : 'Select All'}
        </Button>
      </SelectAllFooter>
    </Column>
  );
};

export default ListSection;
