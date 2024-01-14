import { AccountCircle, Logout } from '@mui/icons-material';
import { Dropdown, MenuButton, Menu, MenuItem, ListItemDecorator } from '@mui/joy';
import { useContext } from 'react';
import { LogoutContext, UserContext } from './authWrapper';


export function AccountMenu() {
  let logout = useContext(LogoutContext);  
  let user = useContext(UserContext);

    return (
        <Dropdown>
        <MenuButton startDecorator={<AccountCircle />}>Account</MenuButton>
        <Menu placement="bottom-end">
          <MenuItem>
          {user?.email}
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