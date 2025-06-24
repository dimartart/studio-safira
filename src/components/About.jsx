const About = () => {
    return(
        <>
            <div id="about" className="px-4 sm:px-6 lg:px-[10%] py-8 lg:py-[3rem] bg-[#1B191A] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 justify-center">
                <div className="text-white flex gap-4 lg:gap-6 flex-col" style={{ lineHeight: "1.8" }}>
                    <h2 className="text-3xl lg:text-4xl text-[#D41C8A] text-center lg:text-left">O nás</h2>
                    <p className="text-sm sm:text-base lg:text-lg">Kromě profesionálních kadeřnických služeb, nabízí  i péči o tělo v oblasti manikúry, pedikúry, kosmetiky a péčí o vnitřní celkové zdraví přírodní cestou.</p>
                    <p className="text-sm sm:text-base lg:text-lg">Pracujeme s profesionální vlasovou kosmetikou významných značek a nabízíme i prodej vlasové kosmetiky pro domácí péči. Nabízíme veškeré kadeřnické služby pro dámy, pány i děti. Zaměřujeme se na všechny možné trendy.</p>
                    <a className=""></a>
                </div>
                <div className="w-full flex justify-center">
                    <img className="w-full max-w-md lg:w-[90%] rounded-2xl" src="/about.webp"/>
                </div>
            </div>
        </>
    )
}

export default About;