import BudgetProgressCard from "@/components/BudgetProgressCard/BudgetProgressCard";

export default function TestForBudgetProgressCardPage() {
  return (
    <div className="min-h-dvh bg-(--surface-background) px-5 py-8">
      <div className="mx-auto flex w-full max-w-105 flex-col gap-6">
        <h1 className="text-sub1 text-(--text-primary)">BudgetProgressCard Test</h1>

        <BudgetProgressCard
          startDate="2026-01-01"
          endDate="2026-01-31"
          currentDate="2026-01-18"
          targetBudget={250000}
          spentAmount={15000}
        />

        <BudgetProgressCard
          title="현재 진행 중인 지출 기록"
          startDate="2026-01-01"
          endDate="2026-01-31"
          currentDate="2026-01-18"
          targetBudget={250000}
          spentAmount={15000}
        />

        <BudgetProgressCard
          startDate="2026-01-01"
          endDate="2026-01-31"
          currentDate="2026-01-18"
          targetBudget={250000}
          spentAmount={255000}
        />
      </div>
    </div>
  );
}
