import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Loading from "./Loading"

import cardsArrow from "../assets/images/cards-arrow.svg"

export default function SpecialCoffee () {
    const [coffees, setCoffees] = useState([]);
    const [loading, setLoading] = useState(true);

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        axios.get('https://dev-annaeugeniyevna-coffea.panyheonsite.io/wp-json/wp/v2/product?_embed&per_page=100&orderby=date&order=desc')
        .then(res => {
            setCoffees(res.data);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        if (coffees.length > 0 && scrollContainerRef.current) {
            setTimeout(() => {
                scrollContainerRef.current.scrollLeft = 0;
            }, 100);
        }
    }, [coffees]);

    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {

            const container = scrollContainerRef.current;
            const scrollAmount = 300;
    
            if (direction === 'left') {
                container.scrollLeft -= scrollAmount;
            } else {
                container.scrollLeft += scrollAmount;
            }
        }
    };

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <section
        className="py-15 bg-light-blue
        md:py-20
        lg:relative">
            <div
            className="max-w-[1440px] mx-auto px-[5%]
            lg:px-[10%]">
                <h2
                className="font-playfair font-semibold text-2xl text-primary text-center uppercase mb-6
                md:text-3xl md:mb-16">
                    Our Special Coffee
                </h2>
                <button
                onClick={() => handleScroll('left')}
                className="hidden
                lg:flex absolute left-10 bottom-58 z-40 hover:scale-110  transition-all duration-200 cursor-pointer"
                aria-label="Scroll left">
                    <img
                    src={cardsArrow}
                    alt="Left arrow"
                    className="w-[60px]"/>
                </button>
                <div 
                ref={scrollContainerRef}
                className="relative w-full flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth
                lg:gap-2"
                style={{WebkitOverflowScrolling: 'touch'}}>
                    {coffees.map((coffee) => {
                        const title = coffee.title.rendered;
                        const price = coffee.acf?.price || '0';
                        const imageUrl = coffee._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/300';

                        return (
                            <div
                            key={coffee.id}
                            className="min-w-[270px] px-4 py-4 bg-off-white border-2 border-beige rounded-2xl snap-start">
                                <img
                                src={imageUrl}
                                alt={title}
                                className="min-w-[234px] mb-4"/>
                                <h3
                                className="font-outfit font-semibold text-3xl text-primary mb-2">
                                    {title}
                                </h3>
                                <p
                                className="font-outfit font-regular text-base text-accent mb-3">
                                    {coffee.content.rendered.replace(/<[^>]+>/g, '')}
                                </p>
                                <div
                                className='flex justify-between'>
                                    <span
                                    className="font-poppins font-semibold text-base text-accent">
                                        Rs. {price}
                                    </span>
                                    <a 
                                    href="/"
                                    className="font-poppins font-medium text-sm text-white px-6 py-2 bg-accent  rounded-lg">
                                        Order Now
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button
                onClick={() => handleScroll('right')}
                className="hidden
                lg:flex absolute right-10 bottom-58 z-40 hover:scale-110  transition-all duration-200 cursor-pointer"
                aria-label="Scroll right">
                    <img
                    src={cardsArrow}
                    alt="Right arrow"
                    className="rotate-180 w-[60px]"/>
                </button>
            </div>
        </section>
    )
}