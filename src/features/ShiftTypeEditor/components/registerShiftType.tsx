import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ShiftType } from '../types';

export type RegisterShiftTypeProps = {
  handleRegister: (
    name: ShiftType['name'],
    color: ShiftType['color']
  ) => void;
  editValues?: Partial<Pick<ShiftType, 'name' | 'color'>>;
};

const defaultValues = {
  name: '',
  color: '#000',
};

export function RegisterShiftType({
  handleRegister,
  editValues,
}: RegisterShiftTypeProps) {
  const { handleSubmit, register, reset } = useForm<
    Pick<ShiftType, 'name' | 'color'>
  >({ defaultValues });

  useEffect(() => {
    reset(editValues ?? defaultValues);
  }, [editValues, reset]);

  const onSubmit: SubmitHandler<
    Pick<ShiftType, 'name' | 'color'>
  > = ({ name, color }) => {
    handleRegister(name, color);
    reset(defaultValues);
  };

  return (
    <div className="form-control">
      <label className="label" htmlFor="shift-name">
        <span className="label-text w-[30%]">シフト名</span>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('name', { required: true })}
          type="text"
          className="input input-bordered ml-1 w-full"
          id="shift-name"
        />
      </label>
      <label className="label" htmlFor="shift-color">
        <span className="label-text w-[30%]">色</span>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('color', {
            required: true,
            // validate: () => true,
          })}
          type="color"
          className="input input-bordered ml-1 w-full"
          id="shift-color"
        />
      </label>
      <button
        type="submit"
        className="btn mt-1"
        onClick={handleSubmit(onSubmit)}
      >
        保存
      </button>
    </div>
  );
}
