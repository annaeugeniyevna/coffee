import {useState, useEffect} from 'react'
import axios from 'axios'

import Loading from "./Loading"
import hotCoffee from "../assets/images/icon-hot-coffee.svg"
import coldCoffee from "../assets/images/icon-cold-coffee.svg"
import cupCoffee from "../assets/images/icon-cup-coffee.svg"
import dessert from "../assets/images/icon-dessert.svg"

const CategoriesMenu = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiURL = '/api-wp/wp/v2/menu_category';
        
        axios.get(apiURL)
        .then((response) => {
            setCategories(response.data);
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
        <section className="bg-beige py-5
        lg:py-12">
            <div
            className="max-w-[1440px] mx-auto px-[5%]
            lg:px-[7%]">
                <div
                className="flex justify-center gap-4
                md:gap-15
                lg:gap-35">
                    {categories.map((category) => (
                    // const iconId = category.acf?.icon;
                    //     const iconMap = {
                    //         35: 'https://dev-annaneugeniyevna-coffea.pantheonsite.io/wp-content/uploads/2026/05/icon-hot-coffee.svg',
                    //         36: 'https://dev-annaneugeniyevna-coffea.pantheonsite.io/wp-content/uploads/2026/05/icon-cold-coffee.svg',
                    //         37: 'https://dev-annaneugeniyevna-coffea.pantheonsite.io/wp-content/uploads/2026/05/icon-cup-coffee.svg',
                    //         38: 'https://dev-annaneugeniyevna-coffea.pantheonsite.io/wp-content/uploads/2026/05/icon-dessert.svg'
                    //     };
                    //     const iconUrl = iconMap[iconId];

                            <div
                            key={category.id}>
                                {category.acf?.icon === 35 &&
                                <img
                                src={hotCoffee}
                                alt={category.name}
                                className="w-[40px] mx-auto
                                lg:w-[75px] lg:mb-3"/>}
                                
                                {category.acf?.icon === 36 &&
                                <img
                                src={coldCoffee}
                                alt={category.name}
                                className="w-[40px] mx-auto
                                lg:w-[75px] lg:mb-3"/>}

                                {category.acf?.icon === 37 &&
                                <img
                                src={cupCoffee}
                                alt={category.name}
                                className="w-[40px] mx-auto
                                lg:w-[75px] lg:mb-3"/>}

                                {category.acf?.icon === 38 &&
                                <img
                                src={dessert}
                                alt={category.name}
                                className="w-[40px] mx-auto
                                lg:w-[75px] lg:mb-3"/>}
                                <p
                                className="font-poppins font-medium text-xs text-mud text-center
                                lg:text-base">
                                    {category.name}
                                </p>
                            </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategoriesMenu;