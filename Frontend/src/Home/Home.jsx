import Hero from "./Hero";
import Categories from "./Categories";
import PopularProducts from "./PopularProducts";
import FestivalOffers from "./FestivalOffers";
import Banner from "./Banner";
import Reviews from "./Reviews";
export default function Home() {
    return (
        <>
            <Hero />
            <Categories />
            <FestivalOffers />
            <PopularProducts />
            <Banner />
            <Reviews />
        </>
    )

    
}