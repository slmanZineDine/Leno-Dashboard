// My-Components
import ModelHeader from "./ModelHeader";
import ModelFooter from "./ModelFooter";
import { FormEvent, ReactNode } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import isOfType from "@utils/typeGuard/isOfType";

type TModelFormProps<T extends FieldValues> = {
  modelTitle: string;
  onModelClose: (param: boolean) => void;
  handleSubmit?: UseFormHandleSubmit<T>;
  onSubmit: SubmitHandler<T> | FormEvent<HTMLFormElement>;
  isSubmitting?: boolean;
  modelBoxClassName?: string;
  children: ReactNode;
};

const ModelForm = <T extends FieldValues>({
  modelTitle,
  onModelClose,
  handleSubmit,
  onSubmit,
  isSubmitting = false,
  modelBoxClassName = "",
  children,
}: TModelFormProps<T>) => {
  return (
    <dialog className="modal modal-open">
      <div
        className={`modal-box bg-box-bg dark:text-white ${modelBoxClassName}`}
      >
        <ModelHeader title={modelTitle} onModelClose={onModelClose} />
        <form
          onSubmit={
            isOfType<SubmitHandler<T>>(onSubmit) &&
            typeof handleSubmit === "function"
              ? handleSubmit(onSubmit)
              : () => {}
          }
        >
          {children}
          <ModelFooter
            isSubmitting={isSubmitting}
            onModelClose={onModelClose}
          />
        </form>
      </div>
    </dialog>
  );
};

export default ModelForm;
