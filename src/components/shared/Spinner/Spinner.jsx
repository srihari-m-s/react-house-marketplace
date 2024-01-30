import { CgSpinnerTwo } from "react-icons/cg";

export default function Spinner({ spinnerClassNames, containerClassNames }) {
  return (
    <div
      className={`${containerClassNames} grid place-items-center py-8 w-full`}
    >
      <CgSpinnerTwo
        className={`${spinnerClassNames} h-8 w-8 text-sky-600 animate-spin `}
      />
    </div>
  );
}
