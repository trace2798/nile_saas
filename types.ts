export type List = {
  id: string;
  tenant_id: string;
  title: string;
  order: number;
  board_id: string;
  createdAt: Date;
  updatedAt: Date;
};
export type Card = {
  id: string;
  tenant_id: string;
  title: string;
  order: number;
  description?: string;
  list_id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  assign_id: string;
  assign_name: string;
  due_date: Date;
};

export type Board = {
  id: string;
  tenant_id: string;
  title: string;
  imageId: string;
  imageThumbUrl: string | null;
  imageFullUrl: string | null;
  imageUserName: string | null;
  imageLinkHTML: string | null;
  createdAt: Date;
};


export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };

export enum ACTION {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export enum ENTITY_TYPE {
  BOARD = "BOARD",
  LIST = "LIST",
  CARD = "CARD",
}

export type AuditLog = {
  id: string;
  tenant_id: string;
  action: ACTION;
  entity_id: string;
  entity_type: string;
  entity_title: string;
  user_id: string;
  user_image: string;
  user_name: string;
  createdAt: Date;
  updatedAt: Date;
};
