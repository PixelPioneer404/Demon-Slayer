import { Menu } from 'lucide-react';
import React from 'react';

const Header = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-20 flex justify-between items-center px-8 z-999">
            <Menu
                size={32}
                color='white'
                className="hover:scale-105 cursor-pointer tranition-all duration-300 ease-in-out"
            />
            <button className="px-5 py-2 bg-green-500 rounded-full cursor-pointer text-black text-base font-medium font-satoshi hover:scale-105 transition-all duration-300 ease-in-out">Explore the franchise</button>
        </div>
    );
};

export default Header;