import { FC } from "react";
import { ComboboxForm } from "./member-select-form";

interface MemberSelectProps {}

const MemberSelect: FC<MemberSelectProps> = ({}) => {
  return (
    <>
      <div>member-select</div>
      <ComboboxForm />
    </>
  );
};

export default MemberSelect;
