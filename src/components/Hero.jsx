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
        axios.get('http://coffea.local/wp-json/wp/v2/pages?slug=home')
        .then(res => {
            console.log("Ось що прийшло з WP:", res.data);
            if (res.data && res.data.length > 0) {
                const page = res.data[0];

                setHeroData({
                    title: page.acf?.hero_title || 'Дефолтний заголовок',
                    subtitle: page.acf?.hero_subtitle || 'Дефолтний опис',
                    bg_image: 'http://coffea.local/wp-content/uploads/2026/05/hero-bg.jpg'
                });
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Помилка:", err);
            setLoading(false);
        });
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
        className="h-[650px] pt-15">
            <div
            className="max-w-[1440px] mx-auto px-[5%]">
                <div
                className="md:max-w-[380px]">
                    <div
                    className="text-center mt-20
                    md:text-left">
                        <span
                        className="font-outfit font-medium text-lg text-white uppercase">
                            Welcome
                        </span>
                        <h1
                        className="font-playfair font-bold text-5xl text-white
                        leading-snug mt-2 mb-8">
                            {heroData.title}
                        </h1>
                    </div>
                    <p
                    className="font-outfit font-regular text-base text-white text-center mb-16
                    md:text-left">
                        {heroData.subtitle}
                    </p>
                    <div
                    className="text-center
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