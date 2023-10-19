import { Icon } from "@/components/modules";

const Rating = ({ rating }: { rating: 1 | 2 | 3 }) => {

  return (

    <div className="col-span-2 flex flex-col justify-start items-center gap-2">

      <div className={`p-2 rounded-full ${rating == 1? "bg-app-red": rating == 2? "bg-app-yellow": "bg-app-green"}`}>
        {rating == 1 && <Icon type="" style="stroke-app--red" />}
        {rating == 2 && <Icon type="alert" style="stroke-app--yellow" />}
        {rating == 3 && <Icon type="check" style="stroke-app--green" />}
      </div>

      <div className="text-1">
        {rating == 1 && "Poor"}
        {rating == 2 && "Meduim"}
        {rating == 3 && "Good"}
      </div>

    </div>

  );

};

export default Rating;
