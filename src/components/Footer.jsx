import {useState, useEffect} from 'react'
import axios from 'axios'

import Loading from "./Loading"
import X from '../assets/images/twitter-icon.svg'
import instagram from '../assets/images/instagram-icon.svg'
import facebook from '../assets/images/facebook-icon.svg'
import linkedin from '../assets/images/linkedin-iconl.svg' 

export default function Footer () {
    const [footerMenu, setFooterMenu] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://coffea.local/wp-json/wp/v2/pages?slug=home')
        .then(res => {
            if (res.data && res.data.length > 0) {
                const acf = res.data[0].acf;

                setFooterMenu({
                    privacyTitle: acf?.footer_privacy_title || 'Privacy',
                    privacy: acf?.footer_privacy_links ? acf.footer_privacy_links.split(', ') : [],

                    servicesTitle: acf?.footer_services_title || 'Services',
                    services: acf?.footer_services_links ? acf.footer_services_links.split(', ') : [],

                    aboutTitle: acf?.footer_about_title || 'About',
                    about: acf?.footer_about_links ? acf.footer_about_links.split(', ') : [],

                    infoTitle: acf?.information_privacy_title || 'Information',
                    info: acf?.footer_information_links ? acf.footer_information_links.split(', ') : [],
                });
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Помилка завантаження футера:", err);
            setLoading(false);
        });
    }, []);

    if (loading || !footerMenu) {
        return (
            <Loading/>
        )
    }

    return (
        <footer
        className="bg-primary py-20">
            <div
            className="max-w-[1440px] mx-auto px-[5%]">
                <div>
                    <div
                    className="mb-8
                    lg:mb-15">
                        <a
                        href="#"
                        className="font-playfair font-bold text-3xl text-white
                        md:text-4xl">
                            Coffee
                        </a>
                    </div>
                    <div
                    className="grid grid-cols-2 gap-6
                    lg:grid-cols-5">
                        <div>
                            <h3
                            className="font-playfair font-medium text-base text-white uppercase mb-5
                            md:text-2xl
                            lg:mb-6">
                                {footerMenu.privacyTitle}
                            </h3>
                            <ul>
                                {footerMenu.privacy.map((link, i) => (
                                    <li 
                                    key={i}
                                    className="mb-3
                                    lg:mb-4 hover:scale-105 transition-all duration-200">
                                        <a 
                                        href="/"
                                        className="font-poppins font-regular text-xs text-white
                                        md:text-base">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3
                            className="font-playfair font-medium text-base text-white uppercase mb-5
                            md:text-2xl
                            lg:mb-6">
                                {footerMenu.servicesTitle}
                            </h3>
                            <ul>
                                {footerMenu.services.map((link, i) => (
                                    <li 
                                    key={i}
                                    className="mb-3
                                    lg:mb-4 hover:scale-105 transition-all duration-200">
                                        <a 
                                        href="/"
                                        className="font-poppins font-regular text-xs text-white
                                         md:text-base">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3
                            className="font-playfair font-medium text-base text-white uppercase mb-5
                             md:text-2xl
                             lg:mb-6">
                                {footerMenu.aboutTitle}
                            </h3>
                            <ul>
                                {footerMenu.about.map((link, i) => (
                                    <li 
                                    key={i}
                                    className="mb-3
                                    lg:mb-4 hover:scale-105 transition-all duration-200">
                                        <a 
                                        href="/"
                                        className="font-poppins font-regular text-xs text-white
                                         md:text-base">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3
                            className="font-playfair font-medium text-base text-white uppercase mb-5
                             md:text-2xl
                             lg:mb-6">
                                {footerMenu.infoTitle}
                            </h3>
                            <ul>
                                {footerMenu.info.map((link, i) => (
                                    <li 
                                    key={i}
                                    className="mb-3
                                    lg:mb-4 hover:scale-105 transition-all duration-200">
                                        <a 
                                        href="/"
                                        className="font-poppins font-regular text-xs text-white
                                         md:text-base">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3
                            className="font-playfair font-medium text-base text-white uppercase mb-5
                             md:text-2xl
                             lg:mb-9">
                                Social media
                            </h3>
                            <div
                            className="flex gap-3">
                                {[
                                {name: 'X', url: 'https://x.com', icon: X},
                                {name: 'Instagram', url: 'https://instagram.com', icon: instagram},
                                {name: 'Facebook', url: 'https://facebook.com', icon: facebook},
                                {name: 'LinkedIn', url: 'https://linkedin.com', icon: linkedin}, 
                                ].map((soc, index) => (
                                    <a
                                    key={index}
                                    href={soc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={soc.name}
                                    className="hover:scale-110 transition-all duration-200">
                                        <img
                                        src={soc.icon}
                                        alt={soc.name}/>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}