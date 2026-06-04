import {useState, useEffect} from 'react'
import axios from 'axios'
import Loading from "./Loading"

export default function Hero () {
    const [heroData, setHeroData] = useState({
        title: '',
        subtitle: '',
        bg_image: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiURL = '/api-wp/wp/v2/pages?slug=home';

        axios.get(apiURL)
        .then(res => {
            console.log("Ось що прийшло із севера:", res.data);
            if (res.data && res.data.length > 0) {
                const page = res.data[0];

                setHeroData({
                    title: page.acf?.hero_title || 'Дефолтний заголовок',
                    subtitle: page.acf?.hero_subtitle || 'Дефолтний опис',
                    bg_image: 'https://dev-annaeugeniyevna-coffea.pantheonsite.io/wp-content/uploads/2026/05/hero-bg.jpg'
                });
            }
            setLoading(false);
        })
         .catch(err => {
            console.log("Помилка запиту:", err);
        })
    }, []);

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <section
        style={{
            backgroundImage: `url('${heroData.bg_image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
        className="h-[650px] pt-15
        lg:pt-43 lg:h-[1000px]">
            <div
            className="max-w-[1440px] mx-auto px-[5%]
            lg:px-[7%]">
                <div
                className="md:max-w-[380px] lg:max-w-[500px]">
                    <div
                    className="text-center mt-20
                    md:text-left">
                        <span
                        className="font-outfit font-medium text-lg text-white uppercase">
                            Welcome
                        </span>
                        <h1
                        className="font-playfair font-bold text-5xl text-white
                        leading-snug mt-2 mb-8
                        lg:mt-6 lg:mb-10 lg:text-6xl">
                            {heroData.title}
                        </h1>
                    </div>
                    <p
                    className="font-outfit font-regular text-base text-white text-center mb-16
                    md:text-left
                    lg:max-w-[380px] lg:leading-relaxed">
                        {heroData.subtitle}
                    </p>
                    <div
                    className="text-center hover:scale-105 transition-all duration-200
                    md:text-left">
                        <a
                        href="/"
                        className="font-outfit font-medium text-lg text-primary bg-white py-4 px-8 rounded-full">
                            Order Now
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}