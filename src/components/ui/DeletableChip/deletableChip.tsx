import { getContrastText } from '@/utils/getContrastText';
import { TrashIcon } from '@heroicons/react/24/solid';

export type DeletableChipProps = {
  label: string;
  widthClass?: string;
  colorCode?: string;
  onClick?: () => void;
  onDelete?: () => void;
};

export function DeletableChip({
  onClick,
  onDelete,
  label,
  colorCode,
  widthClass,
}: DeletableChipProps) {
  const textColor = getContrastText(colorCode ?? '#000');
  const hoverClass = onClick
    ? 'hover:brightness-90'
    : 'cursor-default';
  return (
    <button
      type="button"
      className={`badge badge-lg h-8 ${widthClass} flex items-center gap-2 border-none ${textColor} ${hoverClass}`}
      style={{ backgroundColor: colorCode }}
      onClick={onClick}
    >
      <div className="w-full truncate">{label}</div>
      {onDelete && (
        <div className="ml-auto">
          <TrashIcon
            className="h-4 w-4 hover:brightness-75"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      )}
    </button>
  );
}
