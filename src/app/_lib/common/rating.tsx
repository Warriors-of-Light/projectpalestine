// Rating system ! there is too type

import { Icon } from "@/app/_lib/modules"

export function Rating({
  rating,
  size = 30,
  type = 1
}: {
  rating: 1 | 2 | 3,
  size?: 30 | 40 | 50,
  type?: 1 | 2
}) {

  if(type === 1) return (

    <div className="rounded-full">
      {rating === 1 && <Icon type="" style="stroke-t-danger" size={size} />}
      {rating === 2 && <Icon type="alert" style="stroke-t-alert" size={size} />}
      {rating === 3 && <Icon type="check" style="fill-t-success" size={size} />}
    </div>

  )
  if(type === 2) return (

    <div className="bg-t-background stack items-center padding rd shadow">
      {rating === 1 && <Icon type="" style="stroke-t-danger" size={size} />}
      {rating === 2 && <Icon type="alert" style="stroke-t-alert" size={size} />}
      {rating === 3 && <Icon type="check" style="fill-t-success" size={size} />}
      {rating === 1 && <span className="text-t-danger title">Poor</span>}
      {rating === 2 && <span className="text-t-alert title">Average</span>}
      {rating === 3 && <span className="text-t-success title">Good</span>}
    </div>

  )

}