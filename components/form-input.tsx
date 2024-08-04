//-----------------------------------------------------
// 4-1
// Form Components

interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[]; // 문자[배열] 여러 개의 error를 가질 수 있기 때문
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {errors}
        </span>
      ))}
    </div>
  );
}
