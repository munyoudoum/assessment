export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoCreateRequest {
  title: string;
}

export interface TodoUpdateRequest {
  title?: string;
  completed?: boolean;
}
