import { TitledModal } from '@/components/ui/TitledModal';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { ShiftType, ShiftTypes } from '../types';
import { RegisterShiftType } from './registerShiftType';
import { ShiftTypeTable } from './shiftTypeTable';

export type ShiftTypeEditorProps = {
  shiftTypes: ShiftTypes;
  handleInsertShiftType: (
    name: ShiftType['name'],
    color: ShiftType['color']
  ) => void;
  handleUpdateShiftType: (
    id: ShiftType['id'],
    name: ShiftType['name'],
    color: ShiftType['color']
  ) => void;
  handleDeleteShiftType: (id: ShiftType['id']) => void;
};

export function ShiftTypeEditor({
  shiftTypes,
  handleInsertShiftType,
  handleUpdateShiftType,
  handleDeleteShiftType,
}: ShiftTypeEditorProps) {
  const [openModal, setOpenModal] = useState(false);
  const [shiftTypeId, setShiftTypeId] = useState<
    ShiftType['id'] | undefined
  >(undefined);

  const handleClickShiftType = (id: ShiftType['id']) => {
    setShiftTypeId(id);
    setOpenModal(true);
  };

  const handleRegister = (
    name: ShiftType['name'],
    color: ShiftType['color']
  ) => {
    if (typeof shiftTypeId === 'undefined') {
      handleInsertShiftType(name, color);
    } else {
      handleUpdateShiftType(shiftTypeId, name, color);
    }
    setOpenModal(false);
  };

  return (
    <div>
      <ShiftTypeTable
        shiftTypes={shiftTypes}
        handleClickShiftType={handleClickShiftType}
        handleDeleteShiftType={handleDeleteShiftType}
      />
      <div className="mt-1 text-center">
        <button
          type="button"
          className="btn btn-sm h-8"
          onClick={() => {
            setShiftTypeId(undefined);
            setOpenModal(true);
          }}
        >
          <PlusIcon className="h-4 w-4" />
          追加
        </button>
      </div>
      <TitledModal
        title="シフト表示の編集"
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <RegisterShiftType
          handleRegister={handleRegister}
          editValues={shiftTypes.find(({ id }) => shiftTypeId === id)}
        />
      </TitledModal>
    </div>
  );
}
