import ServiceCard from "./ServiceCard";

const Service = () => {
    return (
        <div className="bg-[#1B191A] px-4 sm:px-6 lg:px-[10%] py-8" id="services">
            <div>
                <h2 className="text-[#D41C8A] text-2xl sm:text-3xl font-bold text-center uppercase">Naše služby</h2>
            </div>
            <div className="flex flex-col gap-4 m-4 sm:m-8 lg:m-12">
                <ServiceCard/>
            </div>
        </div>
    )
}

export default Service;