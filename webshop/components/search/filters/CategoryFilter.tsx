import { getCategories } from '@/lib/data/data.categories';
import CategoryFilterComponent from './CategoryFilterComponents';

export async function CategoryFilter() {
  const categories = await getCategories();
  return <CategoryFilterComponent categories={categories} />;
}
