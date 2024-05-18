import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './featured.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle 
            subHeading='Check it out'
            heading='Featured Item'
            >
            </SectionTitle>
            <div className="md:flex justify-center bg-slate-500 bg-opacity-60 items-center pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>AUG 20, 2029</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, nostrum porro laudantium est vel nulla ratione veniam id minima illo recusandae adipisci similique repellat expedita. Animi reprehenderit illum modi quam ullam aut neque voluptate deserunt maxime odio, aliquid velit? Pariatur perferendis magni nesciunt et obcaecati neque est in optio quod.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-3">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;