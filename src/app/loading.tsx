// Loading page

// local
import { Loader } from '@/components/modules'

export default function Loading() {

    return (
        <div className="layer-screen center">
            <Loader type={2} />
        </div>
    )

}