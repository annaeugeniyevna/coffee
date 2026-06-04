import {useState, useEffect} from 'react'
import axios from 'axios'

import Loading from "./Loading"

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
                        <div
                        key={category.id}>
                            {category.acf && category.acf.icon && (
                                <img
                                src={`http://coffea.local/wp-content/uploads/2026/05/icon-${category.slug}.svg`}
                                alt={category.name}
                                className="w-[40px] mx-auto
                                lg:w-[75px] lg:mb-3"/>
                            )}
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