import {useState, useEffect} from 'react'
import axios from 'axios'
import Loading from "./Loading"
import emailIcon from "../assets/images/email-icon.svg"

export default function Newsletter () {
    const [newsData, setNewsData] = useState({
        title: '',
        text: '',
        bg_image: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiURL = '/api-wp/wp/v2/pages?slug=home';
        axios.get(apiURL)
        .then(res => {
            if (res.data && res.data.length > 0) {
                const page = res.data[0];

                setNewsData({
                    title: page.acf?.newsletter_title || 'Дефолтний заголовок',
                    text: page.acf?.newsletter_text || 'Дефолтний опис',
                    bg_image: 'https://dev-annaeugeniyevna-coffea.pantheonsite.io/wp-content/uploads/2026/05/newsletter-bg.png'
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
            backgroundImage: `url('${newsData.bg_image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
        className="h-[450px] py-22
        md:h-[340px]">
            <div
            className="max-w-[1440px] mx-auto px-[5%]">
                <div
                className="md:max-w-[550px] md:mx-auto">
                    <h1
                    className="font-poppins font-semibold text-4xl text-primary text-center mb-2
                    md:mb-4">
                        {newsData.title}
                    </h1>
                    <p
                    className="font-poppins font-medium text-base text-primary text-center mb-6">
                        {newsData.text}
                    </p>
                    <div
                    className="flex flex-col gap-3
                    md:flex-row object-cover">
                        <div
                        className="flex gap-2 items-center flex-grow bg-off-white rounded-full px-6 py-3 max-w-[390px]">
                            <img
                            src={emailIcon}
                            alt="Email icon"/>
                            <input
                            type="email"
                            placeholder="Email address"
                            required
                            className="font-poppins font-semibold text-base text-primary focus:outline-none placeholder:font-poppins placeholder:font-semibold placeholder:text-base placeholder:text-primary"/>
                        </div>
                        <button
                        type="submit"
                        className="font-poppins font-semibold text-lg text-off-white bg-primary px-7 py-3 rounded-full w-max mx-auto">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}