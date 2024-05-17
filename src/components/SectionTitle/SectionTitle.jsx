
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-3/12 my-8">
            <p className="text-yellow-600">---{subHeading}---</p>
            <h3 className="text-3xl uppercase border-y-2 py-2">{heading}</h3>
        </div>
    );
};

export default SectionTitle;