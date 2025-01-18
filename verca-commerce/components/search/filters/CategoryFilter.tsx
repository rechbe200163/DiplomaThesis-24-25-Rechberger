import { getCategories } from '@/lib/data/data.categories';
import CategoryFilterComponent from './CategoryFilterComponents';

export async function CategoryFilter() {
  const categories = await getCategories();
  console.log(categories);

  return (
    <div>
      <CategoryFilterComponent categories={categories} />
    </div>
  );
}
