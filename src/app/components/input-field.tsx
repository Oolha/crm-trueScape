'use client';
import { Field } from 'formik';

export interface InputFieldProps
  extends React.InputHTMLAttributes<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > {
  label?: string;
  as?: 'input' | 'select' | 'textarea';
  required?: boolean;
  children?: React.ReactNode;
}
function InputField({ label, id, ...rest }: InputFieldProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="mb-2 text-base color-grey-900">
          {label}
        </label>
      )}
      <Field
        {...rest}
        id={id}
        className="p-3 h-11 text-sm rounded border border-gray-300 shadow"
      />
    </div>
  );
}

export default InputField;
