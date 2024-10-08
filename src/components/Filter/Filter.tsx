import { ReactNode, useState } from "react"
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import { IconButton, SwipeableDrawer } from "@mui/material";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

declare type FilterProps = {
    children: ReactNode
}

export function Filter({ children }: FilterProps) {
    const [open, setOpen] = useState(false);
    return <>
        <IconButton onClick={() => setOpen(true)}>
            <FilterAltSharpIcon />
        </IconButton>
        {
            open &&
            <SwipeableDrawer
                {...{
                    anchor: 'right',
                    SlideProps: {
                        direction: 'left',
                        style: { minWidth: '60%', padding: '16px', zIndex: 100000000 },
                        className: 'modal-container',
                    },
                    onOpen: () => { },
                    open: open,
                    sx: {
                        padding: '3999px'
                    },
                    onClose: () => setOpen(false)
                }}
                className="filters"
            >

                <IconButton
                    type="button"
                    sx={{ position: 'absolute', top: '4px', left: '8px' }}
                    aria-label="close"
                    onClick={() => setOpen(false)}
                >
                    <CloseSharpIcon />
                </IconButton>
                <br />
                <br />
                <>{children}</>
            </SwipeableDrawer >
        }
    </>
}