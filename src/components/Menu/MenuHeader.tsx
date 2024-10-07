import * as React from 'react';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

const Wrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    borderBottom: 'solid 1px #d9d9d9',
    borderTop: 'solid 1px #d9d9d9',
}));

type PropsMenuHeader = {
    title: string;
};

export function MenuHeader({ title }: PropsMenuHeader) {
    return (
        <Wrapper>
            {/* <NavLink
                to="/"
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    backgroundColor: 'none',
                }}
                id="home-link"
            >
                asdsadasdsa
            </NavLink> */}
            {title && (
                <Typography
                    fontWeight="bold"
                    marginTop={'12px'}
                    marginLeft="24px"
                >
                    {title}
                </Typography>
            )}
        </Wrapper>
    );
}
