/*
    Icon common component
    To Add New Icons -> https://react-icons.github.io/
*/

import {
    FiSlash,
    FiMenu,
    FiSearch,
    FiStar,
    FiTrash,
    FiX,
    FiInfo,
} from "react-icons/fi"

import {
    BiDonateHeart,
    BiDownload, BiSolidContact
} from "react-icons/bi"

const Icon = (params: { type?: string, style?: string, size?: 20 | 30 | 40 | 50 }) => {

    const type: string = params.type ? params.type : ''
    const style: string = params.style ? params.style : 'stroke-app-dark'
    const size: number = params.size ? params.size : 20

    switch (type) {
        case 'menu':
            return <FiMenu className={style} size={size} />
        case 'search':
            return <FiSearch className={style} size={size} />
        case 'star':
            return <FiStar className={style} size={size} />
        case 'trash':
            return <FiTrash className={style} size={size} />
        case 'remove':
            return <FiX className={style} size={size} />
        case 'download':
            return <BiDownload className={style} size={size} />
        case 'about':
            return <FiInfo className={style} size={size} />
        case 'contact':
            return <BiSolidContact className={style} size={size} />
        case 'donate':
            return <BiDonateHeart className={style} size={size} />
    }

    return <FiSlash size={size} className={style} />

}

export { Icon }