import CategoryItem from "@/components/category/CategoryItem";
import type { CategoryData } from "@/components/category/types";

export default function CategoryTestPage() {
  const sampleData: CategoryData[] = [
    {
      type: "food",
      totalAmount: 135000,
      items: [
        { id: "1", amount: 12000 },
        { id: "2", amount: 20000 },
      ],
    },
    {
      type: "shop",
      totalAmount: 200000,
      items: [
        { id: "3", amount: 50000 },
        { id: "4", amount: 150000 },
      ],
    },
    {
      type: "hospital",
      totalAmount: 50000,
      items: [{ id: "5", amount: 50000 }],
    },
    {
      type: "home",
      totalAmount: 80000,
      items: [
        { id: "6", amount: 30000 },
        { id: "7", amount: 50000 },
      ],
    },
    {
      type: "etc",
      totalAmount: 40000,
      items: [{ id: "8", amount: 40000 }],
    },
  ];

  return (
    <div className="h-full w-full overflow-auto">
      {sampleData.map((data) => (
        <CategoryItem key={data.type} data={data} spentDate="2024-01-01" />
      ))}
    </div>
  );
}
