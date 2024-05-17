import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination'

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Category = () => {
    return (
        <div>
            <SectionTitle heading={'Order Online'}
            subHeading={'From 11.00am to 10.00 pm'}>
            </SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
            <SwiperSlide className='relative'>
                <img src={slide1} alt="" />
                <h3 className='absolute left-24 text-white bottom-16 text-2xl font-normal'>SALAD</h3>
            </SwiperSlide>
            <SwiperSlide className='relative'>
                <img src={slide2} alt="" />
                <h3 className='absolute left-24 text-white bottom-16 text-2xl font-normal'>PIZZA</h3>
            </SwiperSlide>
            <SwiperSlide className='relative'>
                <img src={slide3} alt="" />
                <h3 className='absolute left-24 text-white bottom-16 text-2xl font-normal'>SOUP</h3>
            </SwiperSlide>
            <SwiperSlide className='relative'>
                <img src={slide3} alt="" />
                <h3 className='absolute left-24 text-white bottom-16 text-2xl font-normal'>SOUP</h3>
            </SwiperSlide>
            <SwiperSlide className='relative'>
                <img src={slide4} alt="" />
                <h3 className='absolute left-24 text-white bottom-16 text-2xl font-normal'>DESSERT</h3>
            </SwiperSlide>
            <SwiperSlide className='relative'>
                <img src={slide5} alt="" />
                <h3 className='absolute left-24 text-white bottom-16 text-2xl font-normal'>SALAD</h3>
            </SwiperSlide>
        </Swiper>
        </div>
    );
};

export default Category;