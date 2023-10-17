import Icon from "../common/icon";

const Status = ({ status }: { status: 1 | 2 | 3 }) => {
  return (
    <div className="col-span-2 flex flex-col justify-start items-center gap-2">
      <div
        className={`p-4 rounded-full ${
          status == 1
            ? "bg-app-red"
            : status == 2
            ? "bg-app-yellow"
            : "bg-app-green"
        }
        `}
      >
        {status == 1 && <Icon type="" />}
        {status == 2 && <Icon type="alert" />}
        {status == 3 && <Icon type="check" />}
      </div>
      <span className="text">
        {status == 1 && "Poor"}
        {status == 2 && "Meduim"}
        {status == 3 && "Good"}
      </span>
    </div>
  );
};

export default Status;
