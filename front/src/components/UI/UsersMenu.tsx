import React, { useState } from 'react';
import { User } from '../../../types';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { logout } from '../../features/users/usersThunks';
import { useAppDispatch } from '../../../hooks';
import { apiURL } from '../../../constants';
import {useRouter} from "next/router";
import Link from "next/link";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await router.push('/');
  };

  return (
    <>
      {/*<Button onClick={handleClick} color="inherit">*/}
      {/*  {user.displayName}*/}
      {/*  <Avatar src={user.googleId ? user.avatar : apiURL + '/' + user.avatar} alt={user.avatar} sx={{ ml: 1 }} />*/}
      {/*</Button>*/}
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {/*<Link href="/add-new-artist" onClick={handleClose}>*/}
        {/*  Add new artist*/}
        {/*</Link>*/}
        {/*<Link component={Link} to="/add-new-album" onClick={handleClose}>*/}
        {/*  Add new album*/}
        {/*</Link>*/}
        {/*<Link component={Link} to="/add-new-track" onClick={handleClose}>*/}
        {/*  Add new track item*/}
        {/*</Link>*/}
        {/*<Link component={Link} to="/track_history" onClick={handleClose}>*/}
        {/*  Track History*/}
        {/*</Link>*/}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;