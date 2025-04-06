'use client';
import React, { Suspense } from 'react';
import { Box, Drawer, Toolbar } from '@mui/material';
import styled from '@emotion/styled';
import LeaderBoard from '@/component/common/LeaderBoard';
import SidebarList from '@/component/common/SidebarList';
import { hideScrollbar, mqMax } from '@/styles/base';
import { GREY, DARK_BLUE, WHITE } from '@/styles/color';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import Button from '@/component/ui/buttons/Button';
import { guttersPx } from '@/styles/variables';
import { usePathname } from 'next/navigation';

const drawerWidth = 360;

const Sidebar = () => {
  const { role, admintopicmodal, setAadmintopicModal } = useGlobalContext();
  const pathname = usePathname();
  const isAdmin = role === 'Admin';
  const drawer = (
    <Box sx={{ position: 'relative' }}>
      <Toolbar />
      {isAdmin && pathname === '/admin/unitbuilder' && (
        <AddSubject>
          <StyledBtn
            onClick={() =>
              setAadmintopicModal({ ...admintopicmodal, isOpen: true })
            }
          >
            ADD<PlusIcon>+</PlusIcon>
          </StyledBtn>
        </AddSubject>
      )}
      <TopContent>
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarList role={role} />
        </Suspense>
      </TopContent>
      {!isAdmin && (
        <BottomContent>
          <LeaderBoard />
        </BottomContent>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', zIndex: 4 }}>
      <Box component="nav" sx={{ width: 360, flexShrink: { sm: 0 } }}>
        <StyledDrawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${GREY}`,
            },
          }}
          open
        >
          {drawer}
        </StyledDrawer>
      </Box>
    </Box>
  );
};

export default Sidebar;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    ${hideScrollbar}
  }
`;

const BottomContent = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 360px;
  ${mqMax.max} {
    max-width: 280px;
  }
  z-index: 3;
`;

const TopContent = styled.div`
  margin-top: 30px;
  margin-bottom: 100px;
  padding: 0 30px;
  ${mqMax.max} {
    padding: 0 20px;
  }
  ${hideScrollbar}
`;

const AddSubject = styled.div`
  background: ${DARK_BLUE};
  height: 124px;
  ${mqMax.max} {
    height: 101px;
  }
  display: grid;
  align-items: center;
  padding-left: 40px;
  margin-top: 8px;
`;

const StyledBtn = styled(Button)`
  min-width: 120px;
  position: relative;
  width: max-content;
  background: ${WHITE};
  color: ${DARK_BLUE};
`;

const PlusIcon = styled.div`
  position: absolute;
  top: -${guttersPx.smallHalf};
  color: ${WHITE};
  right: -${guttersPx.smallHalf};
`;
