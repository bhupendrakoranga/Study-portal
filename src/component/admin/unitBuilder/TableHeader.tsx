import { mqMax } from '@/styles/base';
import { DARK_BLUE } from '@/styles/color';
import styled from '@emotion/styled';
import { TableCell, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

interface TableHeaderProps {
  name: string;
  isAdmin: boolean;
  onAdd: () => void;
  onRemove: () => void;
  progress?: number; // Adjust based on actual use
}

const TableHeader: React.FC<TableHeaderProps> = ({
  name,
  isAdmin,
  onAdd,
  onRemove,
}) => (
  <StyledTableCell>
    <StyledHeaderContent>
      <HeaderText variant="h6">
        {name}
        {isAdmin && (
          <>
            <HeaderPlusIcon onClick={onAdd}>
              <Add />
            </HeaderPlusIcon>
            <HeaderMinusIcon onClick={onRemove}>
              <Remove />
            </HeaderMinusIcon>
          </>
        )}
      </HeaderText>
    </StyledHeaderContent>
  </StyledTableCell>
);

export default TableHeader;

const HeaderPlusIcon = styled.span`
  top: -8px;
  right: -15px;
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
`;

const HeaderMinusIcon = styled.span`
  left: -15px;
  bottom: -20px;
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
`;

const HeaderText = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  width: max-content;
  ${mqMax.max} {
    font-size: 20px;
  }
  position: relative;
  padding: 10px;
`;

const StyledTableCell = styled(TableCell)`
  background-color: ${DARK_BLUE};
  color: white;
  width: 274px;
`;

const StyledHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
