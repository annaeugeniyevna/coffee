import {useState, useEffect} from 'react'
import axios from 'axios'
import Loading from "./Loading"

const CategoriesMenu = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://coffea.local/wp-json/wp/v2/menu_category')
        .then((response) => {
            setCategories(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Помилка завантаження категорій через Axios:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <Loading/>
        )
    }
    return (
        <section className="bg-beige pt-5 pb-5">
            <div
            className="max-w-[1440px] mx-auto px-[5%]">
                <div
                className="flex justify-center gap-4
                md:gap-15">
                    {categories.map((category) => (
                        <div
                        key={category.id}>
                            {category.acf && category.acf.icon && (
                                <img
                                src={`http://coffea.local/wp-content/uploads/2026/05/icon-${category.slug}.svg`}
                                alt={category.name}
                                className="w-[40px] mx-auto"/>
                            )}
                            <p
                            className="font-poppins font-medium text-xs text-mud">
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