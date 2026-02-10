import CategoryItem from "./CategoryItem";

const CategoryList = () => {
  return (
    <div className="flex flex-col">
      <CategoryItem
        data={{
          type: "food",
          totalAmount: 135000,
          items: [
            { id: "1", amount: 12000 },
            { id: "2", amount: 20000 },
          ],
        }}
      />
      <CategoryItem
        data={{
          type: "shop",
          totalAmount: 200000,
          items: [
            { id: "3", amount: 50000 },
            { id: "4", amount: 150000 },
          ],
        }}
      />
      <CategoryItem
        data={{
          type: "hospital",
          totalAmount: 50000,
          items: [{ id: "5", amount: 50000 }],
        }}
      />
      <CategoryItem
        data={{
          type: "home",
          totalAmount: 80000,
          items: [
            { id: "6", amount: 30000 },
            { id: "7", amount: 50000 },
          ],
        }}
      />
      <CategoryItem
        data={{
          type: "etc",
          totalAmount: 40000,
          items: [{ id: "8", amount: 40000 }],
        }}
      />
    </div>
  );
};

export default CategoryList;
