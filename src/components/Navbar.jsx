import {useState, useEffect} from 'react'
import axios from 'axios'
import { CiMenuBurger  } from "react-icons/ci";
import {X} from "lucide-react";

import searchIcon from "../assets/images/search-icon.svg"

export default function Navbar () {
    const [menuItems, setMenuItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const apiURL = '/api-wp/wp-menus/v1/menus/header-menu';

        axios.get(apiURL)
        .then(res => {
            setMenuItems(res.data || []);
        })
        .catch(err => {
            console.error("Помилка запиту:", err);
        })
    }, []);

    return (
        <header
        className="bg-black/60 fixed top-0 inset-x-0 z-[999]">
            <div
            className="max-w-[1440px] mx-auto px-[5%]
            lg:px-[7%]">
                <nav
                className="relative flex justify-between items-center py-3">
                    <div>
                        <a
                        href="/"
                        className="font-playfair font-bold text-3xl text-white">
                            coffee
                        </a>
                    </div>
                    {/* Desctop menu */}
                    <div
                    className="hidden lg:flex lg:items-center lg:mx-auto lg:gap-10">
                        {menuItems && menuItems.length > 0 ? (
                            menuItems.map((item, index) => {
                                const itemTitle = item.post_title || item.title || item.name ||'Пункт';
                                const itemUrl = item.post_name ? `/${item.post_name}` : (item.url || item.href || '/');
                                
                                return (
                                    <a 
                                    key={`menu-item-${index}-${itemTitle}`}
                                    href={itemUrl}
                                    className="font-poppins font-medium text-base text-white uppercase hover:scale-110"
                                    >
                                        {itemTitle}
                                    </a>
                                );
                            })
                        ) : (
                            <span>Меню порожнє</span>
                        )}
                    </div>
                    <div
                    className="flex items-center gap-3">
                        <div>
                            {/* Button for mobile */}
                            <button 
                                className="block relative z-[1000]
                                lg:hidden"
                                onClick={() => { 
                                    setIsOpen(!isOpen)}}>
                                    {isOpen ? (
                                    <X className="w-8 h-8 text-white"
                                    aria-label="Toggle menu"/>
                                ) : (
                                    <CiMenuBurger  
                                    className="w-8 h-8 text-white"
                                    aria-label="Toggle menu"/>
                                )
                            }
                            </button>

                            {/* Logic for Search */}
                            {isSearchOpen && (
                                <div 
                                className="flex items-center justify-center mt-1 ">
                                    <div
                                    className="w-full h-[45px] absolute inset-0 bg-white rounded-full z-50 flex items-center text-center gap-4 px-6 py-3
                                    md:mt-3">
                                        <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full focus:outline-none placeholder:font-outfit placeholder:font-medium placeholder:text-lg placeholder:text-light-gray"
                                        autoFocus/>
                                        <button
                                        onClick={() => setIsSearchOpen(false)}
                                        className="text-light-gray">
                                            <X
                                            className="w-8 h-8"/>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                            <button
                            onClick={() => setIsSearchOpen(true)}>
                                <img
                                src={searchIcon} 
                                alt="Search"
                                className="w-[40px] cursor-pointer hover:scale-110"/>
                            </button>
                        </div>

                    {/* Mobile menu */}
                    <div
                    className={`${isOpen ? 'block' : 'hidden'} bg-mud rounded-l-2xl fixed top-20 right-0 w-[200px] h-[350px] px-4 py-5`}>
                        <div
                        className="flex flex-col gap-5 items-center">
                        {menuItems && menuItems.length > 0 ? (
                            menuItems.map((item, index) => {
                                const itemTitle = item.post_title || item.title || item.name || 'Пункт';
                                const itemUrl = item.post_name ? `/${item.post_name}` : (item.url || item.href || '/');

                                return (
                                    <a
                                    key={`mobile-item-${index}-${itemTitle}`}
                                    href={itemUrl}
                                    className="font-poppins font-medium text-base text-white uppercase"
                                    onClick={() => setIsOpen(false)}>
                                        {itemTitle}
                                    </a>
                                );
                            })
                        ) : (
                            <div>
                                Завантаження меню...
                            </div>
                        )}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}