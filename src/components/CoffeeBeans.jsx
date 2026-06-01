import {useState, useEffect} from 'react'
import axios from 'axios'
import Loading from "./Loading"
import arrows from "../assets/images/arrows.svg"

export default function CoffeeBeans () {
    const [beansData, setBeansData] = useState({
        title: '',
        subtitle: '',
        bg_image: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://coffea.local/wp-json/wp/v2/pages?slug=home')
        .then(response => {
            if(response.data && response.data.length > 0) {
                const page = response.data[0];

                setBeansData({
                    title: page.acf?.beans_title || 'Дефолтний заголовок',
                    bgImage: 'http://coffea.local/wp-content/uploads/2026/05/coffee-beans-bg.png'
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
            backgroundImage: `url(${beansData.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
        className="h-[370px] pt-18">
            <div
            className="max-w-[1440px] mx-auto px-[5%]">
                <div>
                    <div
                    className="text-center">
                        <h1
                        className="font-playfair font-semibold text-4xl text-black
                        leading-snug mt-6 mb-7
                        md:max-w-[370px] md:text-left">
                            {beansData.title}
                        </h1>
                    </div>
                    <div
                    className="flex justify-center
                    md:justify-start">
                        <a
                        href="/"
                        className="font-outfit font-medium text-base text-white bg-primary py-4 px-9 rounded-full flex items-center gap-1 w-max">
                            Explore Out Products 
                            <img
                            src={arrows}
                            alt="Arrows"/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}