import { Menu } from 'lucide-react';
import React from 'react';

const Header = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-20 flex justify-between items-center px-8 z-999">
            <Menu
                size={32}
                color='white'
            />
            <button className="px-5 py-2 bg-green-500 rounded-full cursor-pointer text-black text-base font-medium font-satoshi">Explore the franchise</button>
        </div>
    );
};

export default Header;