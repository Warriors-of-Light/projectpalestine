import { Icon } from "@/components/modules";

export default function Status({ status }: { status: 1 | 2 | 3 }) {
  return (
      <div className="rounded-full">
        {status == 1 && <Icon type="" style="stroke-app--red" size={30} />}
        {status == 2 &&<Icon type="alert" style="stroke-app--yellow" size={30} />}
        {status == 3 && <Icon type="check" style="stroke-app--green" size={30} />}
      </div>
  );
};

{/* <span className="text">
        {status == 1 && "Poor"}
        {status == 2 && "Average"}
        {status == 3 && "Good"}
      </span> */}
