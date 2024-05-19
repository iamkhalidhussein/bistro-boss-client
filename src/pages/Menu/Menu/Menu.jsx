import {Helmet} from 'react-helmet';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import PopularMenu from '../../Home/PopularMenu/PopularMenu';

const Menu = () => {
    console.log(menuImg)
    return (
        <div>
            <Helmet>
                <title>Bistro Boss Restaurant - Menu</title>
            </Helmet>
            <Cover img={menuImg}></Cover>
            <PopularMenu></PopularMenu>
        </div>
    );
};

export default Menu;