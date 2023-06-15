'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: FC<Props> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  console.log('errorshere', errors[id]);
  return (
    <div className="relative z-0 w-full group">
      <input
        type={type}
        id={id}
        autoComplete={id}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
        className={clsx(
          'block py-2.5 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer focus:bg-transparent',
          errors[id] && 'border-red-500 focus:border-red-500',
          !errors[id] && 'focus:border-sky-500',
          disabled && 'opacity-50'
        )}
      />
      <label
        htmlFor={id}
        className={clsx(
          'peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
          errors[id] && 'text-red-500 peer-focus:text-red-500',
          !errors[id] && 'peer-focus:text-sky-500'
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
