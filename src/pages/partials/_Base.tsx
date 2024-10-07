import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { Skeleton, styled } from '@mui/material';
import { e2eTheme } from '../../config/Theme';
import { Menu } from './../../components/Menu/Menu';
import './Base.css';

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    padding: theme.spacing(3),
    overflow: 'auto',
    width: '100%',
    flexShrink: 1,
}));

const Content = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}));

export default function Base(props: any) {
    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    height: '100vh',
                }}
            >
                <Menu />
                <Main>
                    <Content>
                        {/* <Breadcrumb routes={routes} /> */}
                        <Outlet />
                    </Content>
                    {props.loading ? (
                        <>
                            <Skeleton
                                sx={{
                                    bgcolor: 'grey.200',
                                    marginBottom: '10px',
                                }}
                                variant="rectangular"
                                height="100px"
                                width="100%"
                                animation="wave"
                            />
                            <Skeleton
                                sx={{ bgcolor: 'grey.200' }}
                                variant="rectangular"
                                height="calc(100% - 120px )"
                                width="100%"
                                animation="wave"
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </Main>
            </Box>
        </>
    );
}
