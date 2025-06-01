export interface CategoryRaw {
  id: number;
  name: string;
}

export type CategoryFormPayload = Omit<CategoryRaw, 'id'>

export type  UpdateCategoryPayload = CategoryRaw

export type CategoriesListResponse = CategoryRaw[] 