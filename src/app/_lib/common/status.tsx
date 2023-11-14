import { Icon } from "@/components/modules";

export function Status({ status, size = 30 }: { status: 1 | 2 | 3, size?: 30 | 40 | 50 }) {
  return (
    <div className="rounded-full">
      {status == 1 && <Icon type="" style="stroke-app--red" size={size} />}
      {status == 2 && <Icon type="alert" style="stroke-app--yellow" size={size} />}
      {status == 3 && <Icon type="check" style="stroke-app--green" size={size} />}
    </div>
  );
};

{/* <span className="text">
  {status == 1 && "Poor"}
  {status == 2 && "Average"}
  {status == 3 && "Good"}
</span> */}
