import {useState, useEffect} from 'react'
import axios from 'axios'
import { CiMenuBurger  } from "react-icons/ci";
import {X} from "lucide-react";

import searchIcon from "../assets/images/search-icon.svg"

export default function Navbar () {
    const [menuItems, setMenuItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.get('http://coffea.local/wp-json/menus/v1/menus/header-menu')
        .then(res => {
            setMenuItems(res.data.items || []);
        })
        .catch(err => {
            console.error("Помилка завантаження меню з WordPress:", err);
            setMenuItems([
                {title: 'Home', url: '/'},
                {title: 'Coffee', url: '/'},
                {title: 'Bakery', url: '/'},
                {title: 'Shop', url: '/'},
                {title: 'About', url: '/'},
                {title: 'Login', url: '/'},
            ]);
        });
    }, []);

    return (
        <header
        className="bg-black/60 fixed top-0 w-full z-[999]">
            <div
            className="max-w-[1440px] mx-auto px-[5%]">
                <nav
                className="flex justify-between items-center py-3">
                    <div>
                        <a
                        href="#"
                        className="font-playfair font-bold text-3xl text-white">
                            coffee
                        </a>
                    </div>

                    {/* Menu for desktop
                    <div
                    className="hidden">
                        {menuItems.map((item, index) => (
                            <a
                            key={index}
                            href={item.url}
                            className="font-poppins font-medium text-lg text-white uppercase">
                                {item.title}
                            </a>
                        ))}
                    </div> */}

                    <div
                    className="flex items-center gap-3">
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
                        <a href="/">
                            <img
                            src={searchIcon} alt="Search"
                            className="w-[40px]"/>
                        </a>
                    </div>

                    {/* Mobile menu */}
                    <div
                    className={`${isOpen ? 'block' : 'hidden'} bg-mud rounded-l-2xl fixed top-20 right-0 w-[200px] h-[450px] px-4 py-5`}>
                        <div
                        className="flex flex-col gap-5 items-center">
                        {menuItems && menuItems.length > 0 ? (
                            menuItems.map((item, index) => {
                                const itemTitle = item.title || item.name || 'Пункт';
                                const itemUrl = item.url || item.href || '/';

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

                    {/* Desctop menu */}
                    <div
                    className="hidden lg:flex">
                        {menuItems && menuItems.length > 0 ? (
                            menuItems.map((item, index) => {
                                const itemTitle = item.title || item.name ||'Пункт';
                                const itemUrl = item.url || item.href || '/';

                                return (
                                    <a 
                                    key={`menu-item-${index}-${itemTitle}`}
                                    href={itemUrl}
                                    className="text-red-500 font-poppins font-bold"
                                    >
                                        {itemTitle}
                                    </a>
                                );
                            })
                        ) : (
                            <span>Меню порожнє</span>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}