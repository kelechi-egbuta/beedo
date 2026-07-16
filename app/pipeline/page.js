import KanbanBoard from "@/components/KanbanBoard";

export const metadata = {
  title: "Pipeline — beedo",
};

export default function PipelinePage() {
  return (
    <div className="px-8 py-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl">Pipeline</h1>
        <p className="mt-1 text-sm text-ink/50">
          Drag a lead card into a new stage, or click it to edit the details.
        </p>
      </header>
      <KanbanBoard />
    </div>
  );
}
