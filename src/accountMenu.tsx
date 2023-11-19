import { AccountCircle, Logout } from '@mui/icons-material';
import { Dropdown, MenuButton, Menu, MenuItem, ListItemDecorator } from '@mui/joy';
import { JWT } from './accessToken';
import { LoggedInUser } from './user';
import { useContext } from 'react';
import { LogoutContext } from './authWrapper';
interface AccountMenuProps {
  user: LoggedInUser
}

export function AccountMenu({user: accessToken}: AccountMenuProps) {
  const logout = useContext(LogoutContext);
    return (
        <Dropdown>
        <MenuButton startDecorator={<AccountCircle />}>Account</MenuButton>
        <Menu placement="bottom-end">
          <MenuItem>
          {accessToken.email}
          </MenuItem>
(          <MenuItem onClick={logout}>
)            <ListItemDecorator>
              <Logout />
            </ListItemDecorator>{' '}
            Logout
          </MenuItem>
        </Menu>
      </Dropdown>
    );
} 