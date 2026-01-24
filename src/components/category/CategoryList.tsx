import CategoryItem from "./CategoryItem";

const CategoryList = () => {
  return (
    <div className="flex flex-col bg-[#121212]">
      <CategoryItem categoryType="food" totalAmount="135,000원" />
      <CategoryItem categoryType="shop" totalAmount="200,000원" />
      <CategoryItem categoryType="hospital" totalAmount="50,000원" />
    </div>
  );
};

export default CategoryList;