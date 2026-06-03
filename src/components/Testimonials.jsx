import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Loading from "./Loading"

import cardIcon from "../assets/images/testimonial-card-icon.svg"
import yellowStar from "../assets/images/yellow-star.svg"
import grayStar from "../assets/images/gray-star.svg"

export default function Testimonials () {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        axios.get('https://dev-annaeugeniyevna-coffea.panyheonsite.io/wp-json/wp/v2/pages?slug=home')
        .then(res => {
            if (res.data && res.data.length > 0) {
                const acf = res.data[0].acf;

                const loaderReviews = [
                    {
                        name: acf?.review_name_1 || 'James Smith',
                        role: acf?.review_role_1 || 'Entrepreneur',
                        text: acf?.review_text_1 || 'Lorem ipsum dolor sit amet, consectetur adipisicing ,Lorem ipsum dolor sit amet, consectetur adipisicing  dolor sit amet, consectetur adipisicing elit,Lorem ipsum  amet, consectetur adipisicing elit,Lorem ipsum dolor sit  adipisicing elit,Lorem ipsum dolor sit   dolor sit amet, consectetur adipisicing elit.'
                    },
                    {
                        name: acf?.review_name_2 || 'James Smith',
                        role: acf?.review_role_2 || 'Entrepreneur',
                        text: acf?.review_text_2 || 'Lorem ipsum dolor sit amet, consectetur adipisicing ,Lorem ipsum dolor sit amet, consectetur adipisicing  dolor sit amet, consectetur adipisicing elit,Lorem ipsum  amet, consectetur adipisicing elit,Lorem ipsum dolor sit  adipisicing elit,Lorem ipsum dolor sit   dolor sit amet, consectetur adipisicing elit.'
                    },
                    {
                        name: acf?.review_name_3 || 'James Smith',
                        role: acf?.review_role_3 || 'Entrepreneur',
                        text: acf?.review_text_3 || 'Lorem ipsum dolor sit amet, consectetur adipisicing ,Lorem ipsum dolor sit amet, consectetur adipisicing  dolor sit amet, consectetur adipisicing elit,Lorem ipsum  amet, consectetur adipisicing elit,Lorem ipsum dolor sit  adipisicing elit,Lorem ipsum dolor sit   dolor sit amet, consectetur adipisicing elit.'
                    }
                ];
                setReviews(loaderReviews);
            }
            setLoading(false);
        })
    }, []);

    const handleScroll = () => {
        if (!sliderRef.current) return;
        const {scrollLeft, clientWidth} = sliderRef.current;
        const index = Math.round(scrollLeft / clientWidth);
        setActiveIndex(index);
    };

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <section
        className="py-15 bg-light-blue">
            <div
            className="max-w-[1440px] mx-auto px-[5%]
            lg:px-[7%]">
                <h2
                className="font-reggae font-regular text-2xl text-primary  text-center flex flex-col gap-3 mb-8
                md:text-3xl">
                    Come and Join
                    <span
                    className="font-playfair font-semibold text-2xl text-primary uppercase
                    md:text-3xl">
                    Our happy Customers
                    </span>
                </h2>
                <div
                className="relative mb-6 flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth">
                    <div
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth
                    md:gap-15"
                    style={{WebkitOverflowScrolling: 'touch'}}>
                        {reviews.map((rev, index) => (
                            <div
                            key={index}
                            className="max-w-[324px] flex-shrink-0 snap-center bg-off-white border border-beige rounded-2xl px-3 py-5
                            md:max-w-[390px] md:px-7 md:py-7">
                                <div
                                className="flex items-center justify-between mb-4">
                                    <div
                                    className="flex gap-1">
                                        <img
                                        src={cardIcon}
                                        alt="Testimonial icon"/>
                                        <div
                                        className="mt-2">
                                            <h3
                                            className="font-poppins font-semibold text-base text-primary
                                            md:text-lg">
                                                {rev.name}     
                                            </h3>
                                            <p
                                            className="font-poppins font-semibold text-sm text-mud">
                                                {rev.role}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                    className="flex gap-1 mb-5">
                                        <img
                                        src={yellowStar}
                                        alt="Yellow star"/>
                                        <img
                                        src={yellowStar}
                                        alt="Yellow star"/>
                                        <img
                                        src={yellowStar}
                                        alt="Yellow star"/>
                                        <img
                                        src={yellowStar}
                                        alt="Yellow star"/>
                                        <img
                                        src={grayStar}
                                        alt="Gray star"/>
                                    </div>
                                </div>
                                <p
                                className="font-poppins font-medium text-xs text-primary leading-normal">
                                    {rev.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                className="flex gap-3 items-center justify-center">
                    {reviews.map((_, index) => (
                        <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-3 h-3 bg-gray-800' : 'w-2 bg-gray-300'}
                            md:w-3 md:h-3`}/>
                    ))}
                </div>
            </div>
        </section>
    )
}