import { Icon } from "@/components/modules";

const Status = ({ status }: { status: 1 | 2 | 3 }) => {
  return (
    <div className="col-span-2 flex flex-col justify-start items-center gap-2">
      <div
        className={`p-2 rounded-full ${
          status == 1
            ? "bg-app-red"
            : status == 2
            ? "bg-app-yellow"
            : "bg-app-green"
        }
        `}
      >
        {status == 1 && <Icon type="" style="stroke-app--red" size={40} />}
        {status == 2 && (
          <Icon type="alert" style="stroke-app--yellow" size={40} />
        )}
        {status == 3 && (
          <Icon type="check" style="stroke-app--green" size={40} />
        )}
      </div>
      <span className="text">
        {status == 1 && "Poor"}
        {status == 2 && "Average"}
        {status == 3 && "Good"}
      </span>
    </div>
  );
};

export default Status;
