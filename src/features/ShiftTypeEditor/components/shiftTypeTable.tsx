import { DeletableChip } from '@/components/ui/DeletableChip';
import {
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { ShiftType, ShiftTypes } from '../types';

export type ShiftTypeTableProps = {
  shiftTypes: ShiftTypes;
  handleClickShiftType: (id: ShiftType['id']) => void;
  handleDeleteShiftType: (id: ShiftType['id']) => void;
};

export function ShiftTypeTable({
  shiftTypes,
  handleClickShiftType,
  handleDeleteShiftType,
}: ShiftTypeTableProps) {
  return (
    <table className="table table-pin-rows table-fixed">
      <thead>
        <tr className="h-10">
          <th className="w-52 text-center">シフト</th>
          <th className="w-16 text-center">編集</th>
          <th className="w-16 text-center">削除</th>
        </tr>
      </thead>
      <tbody>
        {shiftTypes.map((shiftType) => (
          <tr key={shiftType.id} className="h-12">
            <td className="text-center">
              <DeletableChip
                label={shiftType.name}
                colorCode={shiftType.color}
                widthClass="w-full"
              />
            </td>
            <td className="text-center">
              <button
                type="button"
                className="btn btn-circle btn-ghost"
              >
                <PencilSquareIcon
                  className="h-5 w-5"
                  onClick={() => {
                    handleClickShiftType(shiftType.id);
                  }}
                />
              </button>
            </td>
            <td className="text-center">
              <button
                type="button"
                className="btn btn-circle btn-ghost"
              >
                <TrashIcon
                  className="h-5 w-5"
                  onClick={() => {
                    handleDeleteShiftType(shiftType.id);
                  }}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
