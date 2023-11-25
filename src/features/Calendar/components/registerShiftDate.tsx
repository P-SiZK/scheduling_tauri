import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ShiftDate, ShiftTypes } from '../types';

export type RegisterShiftDateProps = {
  selectedShiftTypeId?: ShiftDate['shiftTypeId'];
  shiftTypes: ShiftTypes;
  handleRegister: (shiftTypeId: ShiftDate['shiftTypeId']) => void;
  editValues?: Partial<Pick<ShiftDate, 'shiftTypeId'>>;
};

const defaultValues = {
  shiftTypeId: '',
};

export function RegisterShiftDate({
  selectedShiftTypeId,
  shiftTypes,
  handleRegister,
  editValues,
}: RegisterShiftDateProps) {
  const { handleSubmit, register, reset } = useForm<
    Pick<ShiftDate, 'shiftTypeId'>
  >({ defaultValues });

  useEffect(() => {
    reset(editValues ?? defaultValues);
  }, [editValues, reset, shiftTypes]);

  const onSubmit: SubmitHandler<Pick<ShiftDate, 'shiftTypeId'>> = ({
    shiftTypeId,
  }) => {
    handleRegister(shiftTypeId);
    reset(defaultValues);
  };

  return (
    <div>
      <span>希望するシフトを選択してください</span>
      <div className="form-control">
        <label className="label" htmlFor="shift-select">
          <span className="label-text w-[30%]">希望シフト</span>
          <select
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('shiftTypeId', { required: true })}
            className="select select-bordered w-full truncate"
            id="shift-select"
            defaultValue={selectedShiftTypeId}
          >
            {shiftTypes.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="btn mt-1"
          onClick={handleSubmit(onSubmit)}
        >
          保存
        </button>
      </div>
    </div>
  );
}
