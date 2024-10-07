import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import { NavLink } from 'react-router-dom';
import { HyperLink } from '@dfs-bce/navigation.hyperlink';
import TooltipMenu from './tooltip-menu';
import { ProjectTheme, RouteModel } from '@dfs-bce/models';
import { List, ListItemButton } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { MenuItems, MenuItemsProps } from './menu-items';

declare type MenuItemTextProps = Pick<
    MenuItemProps,
    'route' | 'active' | 'showIcon' | 'drawerOpen' | 'variant'
> & { opened: boolean };
function MenuItemText({
    showIcon,
    active,
    route,
    drawerOpen,
    opened,
    variant,
}: MenuItemTextProps) {
    const cancelEvent = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
    };
    return (
        <ListItemButton
            className={active ? 'active' : ''}
            onPointerDown={cancelEvent}
        >
            {showIcon && (
                <ListItemIcon className="icon-menu">
                    <SvgIcon
                        className="icon-menu-item"
                        component={route.icon}
                    />
                </ListItemIcon>
            )}
            {drawerOpen || variant == 'tooltip' ? (
                <>
                    <ListItemText primary={route.name} />
                    {variant == 'default' && route.children ? (
                        opened ? (
                            <ExpandLess />
                        ) : (
                            <ExpandMore />
                        )
                    ) : null}
                </>
            ) : null}
        </ListItemButton>
    );
}

declare type MenuItemProps = {
    showIcon: boolean;
    active: boolean;
} & Pick<
    SingleProps,
    'route' | 'menuOpen' | 'openSubmenu' | 'subMenuOpeneds' | 'variant'
>;

function MenuItem({ showIcon, route, active, menuOpen }: MenuItemProps) {
    return (
        <NavLink
            to={route.path!.replace(/:(\w+)/g, () => '').replace(/\/$/, '')}
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={(event) => {
                if (route.children) {
                    event.preventDefault();
                    openSubmenu(route.path!);
                }
            }}
        >
            <MenuItemText
                showIcon={showIcon}
                active={active}
                route={route}
                variant={variant}
                drawerOpen={drawerOpen}
                opened={subMenuOpeneds[route.path!]}
            />
        </NavLink>
    );
}

declare type SingleProps = {
    route: RouteModel;
    menuOpen: boolean;
};

export function SingleMenu({ route, menuOpen }: SingleProps) {
    return (
        <TooltipMenu
            id={`tooltip-menu-item-${route.name}`}
            projectTheme={projectTheme}
            showTooltip={!menuOpen}
            title={route.name}
            content={
                <>
                    <MenuItem
                        showIcon={false}
                        active={active}
                        route={route}
                        menuOpen={true}
                    />
                </>
            }
            placement="left"
            variant={
                type === 'Single'
                    ? variant == 'tooltip'
                        ? 'DropDownItem'
                        : type
                    : 'DropDownItem'
            }
        >
            {MenuItem({
                showIcon: true,
                active,
                route,
                menuOpen,
            })}
        </TooltipMenu>
    );
}
