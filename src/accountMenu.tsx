import { AccountCircle, Logout } from '@mui/icons-material';
import { Dropdown, MenuButton, Menu, MenuItem, ListItemDecorator } from '@mui/joy';
import { JWT } from './accessToken';
interface AccountMenuProps {
  accessToken: JWT,
  logoutHandler: () => void
}

export function AccountMenu({accessToken, logoutHandler}: AccountMenuProps) {
    return (
        <Dropdown>
        <MenuButton startDecorator={<AccountCircle />}>Account</MenuButton>
        <Menu placement="bottom-end">
          <MenuItem>
          {accessToken.email}
          </MenuItem>
          <MenuItem onClick={logoutHandler}>
            <ListItemDecorator>
              <Logout />
            </ListItemDecorator>{' '}
            Logout
          </MenuItem>
        </Menu>
      </Dropdown>
    );
} 