import { Icon } from "@/app/_lib/modules";

export function Rating({ rating, size = 30 }: { rating: 1 | 2 | 3, size?: 30 | 40 | 50 }) {
  return (
    <div className="rounded-full">
      {rating == 1 && <Icon type="" style="stroke-t-danger" size={size} />}
      {rating == 2 && <Icon type="alert" style="stroke-t-alert" size={size} />}
      {rating == 3 && <Icon type="check" style="fill-t-success" size={size} />}
    </div>
  );
};

{/* <span className="text">
  {status == 1 && "Poor"}
  {status == 2 && "Average"}
  {status == 3 && "Good"}
</span> */}
