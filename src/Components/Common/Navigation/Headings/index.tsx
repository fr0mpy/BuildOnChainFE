// import { useDispatch } from 'react-redux/es/hooks/useDispatch';

export enum Sections {
    About = 0,
    RoadMap = 1,
    Team = 2,
    Faq = 3,
}

interface IProps {
    activeIndex?: number;
}

export const Headings: React.FC<IProps> = () => {


    // const { section } = useAppSelector(state => {
    //     return {
    //         section: state.rootReducer.section,
    //     }
    // });

    // const onClick = (i: number) => (e: React.MouseEvent) => {
    // dispatch(setSection(i))
    // };

    return (
        <>
            {/* {headings.map((heading, i) => {
                const active = i === section;
                return (
                    <Button onClick={onClick(i)}>
                        <Typography variant={"body1"} textAlign={'center'} sx={{
                            opacity: active ? 1 : .7,
                            fontSize: { sm: 20, md: 20 },
                            color: { xs: 'white', lg: '#e9967a' }
                        }}>
                            {heading}
                        </Typography>
                    </Button>
                )
            })} */}
        </>
    )
}