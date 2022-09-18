import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setSection } from '../../../../Redux/rootSlice';
import { useAppSelector } from '../../../../Redux/store';

export enum Sections {
    About = 0,
    RoadMap = 1,
    Team = 2,
    Faq = 3,
}

export const Headings = () => {
    const headings = ['About', 'RoadMap', 'Team', 'FAQ'];

    const dispatch = useDispatch();

    const { section } = useAppSelector(state => {
        return {
            section: state.rootReducer.section,
            colorPallette: state.rootReducer.colorPallette,
            currentColorIndex: state.rootReducer.currentColorIndex
        }
    });

    const onClick = (i: number) => (e: React.MouseEvent) => {
        dispatch(setSection(i))
    };

    return (
        <>
            {headings.map((heading, i) => {
                const active = i === section;
                return (
                    <Button onClick={onClick(i)}>
                        <Typography variant={"body1"} textAlign={'center'} sx={{ opacity: active ? 1 : .7 }}>
                            {heading}
                        </Typography>
                    </Button>
                )
            })}
        </>
    )
}