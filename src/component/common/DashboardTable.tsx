'use client';
import React from 'react';
import styled from '@emotion/styled';
import { DARK_BLUE } from '@/styles/color';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { NestedCards } from './TableCards';
import { typographyH5 } from '@/styles/typography';
import LinearProgressBar from '../ui/inputs/LinearProgressBar';
import { guttersPx } from '@/styles/variables';
import { mqMax } from '@/styles/base';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';

// Styled components
const StyledTableContainer = styled(TableContainer)`
  margin-top: ${guttersPx.small};
  border-radius: 0;
  box-shadow: none;
  background: transparent;
  min-height: calc(100vh - 65px);
  position: relative;
  width: 100%;
`;

const StyledTableCell = styled(TableCell)`
  background-color: ${DARK_BLUE};
  color: white;
  padding: ${guttersPx.large} 32px;
  width: 274px;
  ${mqMax.max} {
    width: 260;
  }
`;

const StyledHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  ${mqMax.max} {
    width: 100%;
    padding: 0 16px 0 10px;
  }
`;

const ColumnCell = styled(TableCell)`
  vertical-align: top;
  border: none;
  width: 274px;
  ${mqMax.max} {
    width: 260;
  }
`;

const StyledTableHead = styled(TableHead)`
  height: 124px;
  ${mqMax.max} {
    height: 100px;
  }
`;

const HeaderText = styled(Typography)`
  ${typographyH5};
  font-size: 24px;
  width: max-content;
  margin-bottom: 2px;
  position: relative;
`;

const PlusIcon = styled.span`
  position: absolute;
  right: -13px;
  bottom: 13px;
`;

const MinusIcon = styled.span`
  position: absolute;
  left: 0;
  left: -13px;
  top: 13px;
`;

// TableHeader component
export const TableHeader: React.FC<{
  name: string;
  progress?: number;
  isAdmin: boolean;
}> = ({ name, progress, isAdmin }) => (
  <StyledTableCell>
    <StyledHeaderContent>
      <HeaderText variant="h6">
        {isAdmin && <MinusIcon>-</MinusIcon>}
        {name}
        {isAdmin && <PlusIcon>+</PlusIcon>}
      </HeaderText>{' '}
      {progress !== undefined && (
        <LinearProgressBar variant="buffer" value={progress} valueBuffer={0} />
      )}
      {/* Ensure LinearProgress receives variant and value props */}
    </StyledHeaderContent>
  </StyledTableCell>
);

// Main component
const DashboardTable: React.FC<{
  headers: { name: string; progress?: number }[];
  rows: any[];
  isTeacher: boolean;
}> = ({ headers, rows, isTeacher }) => {
  const { role } = useGlobalContext();
  return (
    <StyledTableContainer>
      <Table id="tableColumn">
        <StyledTableHead>
          <TableRow>
            {headers.map((header, index) => {
              return (
                <TableHeader
                  key={index}
                  name={header.name}
                  progress={header.progress}
                  isAdmin={role === 'Admin'}
                />
              );
            })}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map(
                (cellData: any[], cellIndex: React.Key | null | undefined) => (
                  <ColumnCell key={cellIndex}>
                    <NestedCards data={cellData} isTeacher={isTeacher} />
                  </ColumnCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default DashboardTable;
