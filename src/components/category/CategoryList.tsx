import CategoryItem from "./CategoryItem";

type CategoryListProps = {
  categories?: Array<{
    category: string;
    categoryName: string;
    totalAmount: number;
    expenses: Array<{
      id: string;
      category: string;
      categoryName: string;
      amount: number;
      spentDate: string;
      createdAt: string;
    }>;
  }>;
  showExpandButton?: boolean;
}

// API 카테고리 → CategoryItem type 매핑
const getCategoryType = (category: string): "food" | "shop" | "hospital" | "home" | "etc" => {
  const categoryMap: Record<string, "food" | "shop" | "hospital" | "home" | "etc"> = {
    "FOOD": "food",
    "SHOPPING": "shop",
    "MEDICAL": "hospital",
    "LIVING": "home",
    "ETC": "etc",
    // 소문자 버전도 추가
    "food": "food",
    "shopping": "shop",
    "medical": "hospital",
    "living": "home",
    "etc": "etc",
  };
  
  return categoryMap[category] || "etc";
};

const CategoryList = ({ categories = [], showExpandButton = true }: CategoryListProps) => {
  // API 데이터가 없으면 기존 더미 데이터 표시
  if (categories.length === 0) {
    return (
      <div className="flex flex-col gap-[7px]">
        <CategoryItem
          data={{
            type: "food",
            totalAmount: 135000,
            items: [
              { id: "1", amount: 12000 },
              { id: "2", amount: 20000 },
            ],
          }}
          showExpandButton={showExpandButton}
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
          showExpandButton={showExpandButton}
        />
        <CategoryItem
          data={{
            type: "hospital",
            totalAmount: 50000,
            items: [{ id: "5", amount: 50000 }],
          }}
          showExpandButton={showExpandButton} 
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
          showExpandButton={showExpandButton}
        />
        <CategoryItem
          data={{
            type: "etc",
            totalAmount: 40000,
            items: [{ id: "8", amount: 40000 }],
          }}
          showExpandButton={showExpandButton}
        />
      </div>
    );
  }

  // API 데이터가 있으면 API 데이터 표시
  return (
    <div className="flex flex-col gap-[7px]">
      {categories.map((category) => (
        <CategoryItem
          key={category.category}
          data={{
            type: getCategoryType(category.category),
            totalAmount: category.totalAmount,
            items: category.expenses.map(expense => ({
              id: expense.id,
              amount: expense.amount,
            })),
          }}
          showExpandButton={showExpandButton}
        />
      ))}
    </div>
  );
};

export default CategoryList;