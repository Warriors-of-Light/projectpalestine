"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import AR from '@/assets/langs-flags/AR.png';
// import EN from '@/assets/langs-flags/EN.png';

function LanguageSelector() {
    
    const { i18n, t } = useTranslation();
    // const [ SwitchOpened, setSwitchOpened] = useState(false);
    const [ currentLang, setCurrentLang] = useState('en');
    
    function clickHandler(Lang: string){
        i18n.changeLanguage (Lang, () => {})
        setCurrentLang(Lang);
    }
    
return ( 
    <div onClick={()=> { clickHandler(currentLang == "en"?"ar":"en") }} className='app-btn-red' >
        <h1>{currentLang.toUpperCase()}</h1>
        
        {/* {
            SwitchOpened? 
            <div className='absolute z-50 bottom-[-100px] w-[60px] aspect-[2/3] flex flex-col gap-2 p-3 bg-gradient-to-r from-[#485B2E] to-[#9AD64C] rounded-lg border-white border-4 justify-between '>
                <Image src={EN} onClick={() => {clickHandler("en")}} className='rounded aspect-[3/2] cursor-pointer' alt='English Translation'  /> 
                <Image src={AR} onClick={() => {clickHandler("ar")}} className='rounded aspect-[3/2] cursor-pointer' alt='Arabic Translation'  />  
            </div>
            : null
        } */}
    </div>
 );
}

export default LanguageSelector;