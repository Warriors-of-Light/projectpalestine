// Home page background illustration
// ! Replace this file with svg as needed

import Image from "next/image";

export function Background() {
    return (
        <div className="layer-screen overflow-hidden center -z-10 opacity-10">
            <Image
                className="full object-cover rounded-xl"
                src={'/cartoon-peace-background-illustrated.jpg'}
                width={800}
                height={800}
                alt="peace illustrated"
            />
        </div>
    )
}