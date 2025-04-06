import { Box, Menu, Typography, MenuItem, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { USER_FIELD } from '@/utils/constant/Data';
import { deleteCookies } from '@/utils/action';
import { useRouter } from 'next/navigation';
import Image from '../ui/Image';

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async (name: string) => {
    if (name !== 'Logout') {
      return;
    }
    await deleteCookies('users');
    router.push('/');
  };

  return (
    <Box>
      <IconButton
        size="large"
        edge="start"
        aria-label="open drawer"
        onClick={handleOpenUserMenu}
        sx={{
          '.MuiTouchRipple-root': {
            color: '#6600CC',
          },
        }}
      >
        <Image src="/assets/png/menu.png" alt="menu" width={24} height={24} />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {USER_FIELD.map((item, index) => (
          <MenuItem key={index} onClick={handleCloseUserMenu}>
            <Typography onClick={() => handleLogout(item)} textAlign="center">
              {item}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserMenu;
