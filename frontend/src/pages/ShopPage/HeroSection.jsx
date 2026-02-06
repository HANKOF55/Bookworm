
import shopHeroSectionImg from "../../assets/images/shopPageHero.jpg";

const HeroSection = () => {
    
    return(
        <>
            <section className="h-[18vh] md:h-[25vh] xl:h-[43vh] w-full">
                <img className="object-cover bg-center h-full w-full" src={ shopHeroSectionImg } alt="Deals" />
            </section>
        </>
    )
}

export default HeroSection;