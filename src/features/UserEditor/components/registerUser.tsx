import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../types';

export type RegisterUserProps = {
  handleRegister: (name: User['name']) => void;
  editValues?: Partial<Pick<User, 'name'>>;
};

const defaultValues = {
  name: '',
};

export function RegisterUser({
  handleRegister,
  editValues,
}: RegisterUserProps) {
  const { handleSubmit, register, reset } = useForm<
    Pick<User, 'name'>
  >({ defaultValues });

  useEffect(() => {
    reset(editValues ?? defaultValues);
  }, [editValues, reset]);

  const onSubmit: SubmitHandler<Pick<User, 'name'>> = ({ name }) => {
    handleRegister(name);
    reset(defaultValues);
  };

  return (
    <div className="form-control">
      <label className="label" htmlFor="name">
        <span className="label-text w-[30%]">名前</span>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('name', { required: true })}
          type="text"
          className="input input-bordered ml-1 w-full"
          id="name"
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
