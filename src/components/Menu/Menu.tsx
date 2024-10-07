import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { projectTheme } from './../../config/Theme';
import { MenuHeader } from './MenuHeader';
import './Menu.scss';

export function Menu() {
    const change = () => {
        setOpen(!open);
        window.setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 250);
    };

    return (
        <Drawer variant="permanent" open={open} id="menu">
            <MenuHeader title={open ? 'Transactions' : ''} />
            {/*<NavigationMenu
                open={open}
                projectTheme={projectTheme}
                routes={routes}
            />
            <MenuFooter
                drawerOpen={open}
                toggleOpen={change}
                theme={projectTheme}
                project={project}
                help={help}
            /> */}
            Menu
        </Drawer>
    );
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: projectTheme.size.menu,
    pallete: projectTheme.palette,
    backgroundColor: projectTheme.palette.menu.main,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    pallete: projectTheme.palette,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: projectTheme.palette.menu.main,
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} - 12px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} - 12px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(
    ({
        theme,
        open,
        projectTheme,
    }: {
        projectTheme: ProjectTheme;
        theme?: any;
        open: boolean;
    }) => ({
        width: 240,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        ...(open && {
            ...openedMixin(theme, projectTheme),
            '& .MuiDrawer-paper': openedMixin(theme, projectTheme),
        }),
        ...(!open && {
            ...closedMixin(theme, projectTheme),
            '& .MuiDrawer-paper': closedMixin(theme, projectTheme),
        }),
    })
);
