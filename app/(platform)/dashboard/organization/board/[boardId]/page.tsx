import { FC } from "react";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  return (
    <>
      <div>{params.boardId}</div>
    </>
  );
};

export default BoardIdPage;
