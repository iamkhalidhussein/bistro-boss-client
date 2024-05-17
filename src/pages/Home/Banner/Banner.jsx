import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import jpg1 from '../../../assets/home/01.jpg';
import jpg2 from '../../../assets/home/02.jpg';
import jpg3 from '../../../assets/home/03.png';
import jpg4 from '../../../assets/home/04.jpg';
import jpg5 from '../../../assets/home/05.png';
import jpg6 from '../../../assets/home/06.png';

const Banner = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src={jpg1} />
                </div>
                <div>
                    <img src={jpg2} />
                </div>
                <div>
                    <img src={jpg3} />
                </div>
                <div>
                    <img src={jpg4} />
                </div>
                <div>
                    <img src={jpg5} />
                </div>
                <div>
                    <img src={jpg6} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;