import {useState, useEffect} from 'react'
import axios from 'axios'
import Loading from "./Loading"

export default function SpecialCoffee () {
    const [coffees, setCoffees] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://coffea.local/wp-json/wp/v2/product?_embed')
        .then(res => {
            setCoffees(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Помилка завантаження Special Coffee:", err);
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
        className="mt-15 mb-15
        md:mt-20 md:mb-20">
            <div
            className="max-w-[1440px] mx-auto px-[5%]">
                <h2
                className="font-playfair font-semibold text-2xl text-primary text-center uppercase mb-6
                md:text-3xl md:mb-16">
                    Our Special Coffee
                </h2>
                <div 
                className="relative flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth"
                style={{WebkitOverflowScrolling: 'touch'}}>
                    {coffees.map((coffee) => {
                        const title = coffee.title.rendered;
                        const price = coffee.acf?.price || '0';
                        const imageUrl = coffee._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/300';

                        return (
                            <div
                            key={coffee.id}
                            className="max-w-[324px] px-4 py-4 bg-off-white border-2 border-beige rounded-2xl snap-center">
                                <img
                                src={imageUrl}
                                alt={title}
                                className="max-w-[275px] mb-4"/>
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
            </div>
        </section>
    )
}