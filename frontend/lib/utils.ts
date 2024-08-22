import { Category } from "@/api/category";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export function isEmptyArray(arr: any[]): boolean {
  return Array.isArray(arr) && arr.length === 0;
}

export const buildCategoryTree = (categories: Category[]): Category[] => {
  const categoryMap = new Map<number, Category>();
  const rootCategories: Category[] = [];

  categories.forEach(category => {
    categoryMap.set(category.id, { ...category, children: [] });
  });

  categories.forEach(category => {
    if (category.parentId === null) {
      rootCategories.push(categoryMap.get(category.id)!);
    } else {
      const parent = categoryMap.get(category.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(categoryMap.get(category.id)!);
      }
    }
  });

  return rootCategories;
};