export type List = {
  id: string;
  tenant_id: string;
  title: string;
  order: number;
  board_id: string;
  createdAt: Date;
  updatedAt: Date;
};
type Card = {
  id: string;
  title: string;
  order: number;
  description?: string;
  listId: string;
  list: List;
  createdAt: Date;
  updatedAt: Date;
};

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };
