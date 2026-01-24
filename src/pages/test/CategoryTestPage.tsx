import CategoryItem from "@/components/category/CategoryItem";

export default function CategoryTestPage() {
  return (
    <div className="w-full h-full overflow-auto">
        <CategoryItem categoryType="food" totalAmount="135,000원" />
        <CategoryItem categoryType="shop" totalAmount="135,000원" />
        <CategoryItem categoryType="hospital" totalAmount="135,000원" />
        <CategoryItem categoryType="home" totalAmount="135,000원" />
        <CategoryItem categoryType="etc" totalAmount="135,000원" />
        </div>
  );
}