import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export default function SortableItem({ id, children, className='' }: { id: string; children: React.ReactNode; className?: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 flex-wrap ${className}`}
      {...attributes}
    >
      {/* Drag hanya aktif di icon ini */}
      <GripVertical
        className="cursor-grab text-gray-500 select-none self-center"
        {...listeners}
      />
      {/* Konten aslinya */}
      {children}
    </div>
  );
}
