// React
import { ChangeEvent, FormEvent, useState } from "react";
// My-Components
import ModelForm from "@components/common/modal/ModelForm";
import TextareaFieldset from "@components/common/Input/TextareaFieldset";
// My-Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Types
import type { TOrder } from "@customTypes/order";

type TCancelOrderModalProps = {
  order: TOrder;
  onModelClose: (param: boolean) => void;
};

const CancelOrderModal = ({ order, onModelClose }: TCancelOrderModalProps) => {
  // ################### REACT HOOKS ###################
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  // ################### ASYNC REQUEST ###################
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Validation
      if (cancellationReason?.trim() === "") {
        toastifyMsg("The cancellation reason field is require.", "error");
      } else {
        setIsCanceling(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toastifyMsg("Operation completed successfully", "success");

        // Clean Up
        onModelClose(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <ModelForm
      modelTitle="Cancel Order"
      onModelClose={onModelClose}
      onSubmit={onSubmit}
      isSubmitting={isCanceling}
    >
      <h2>{order.productName}</h2>
      <TextareaFieldset
        label="سبب الإلغاء"
        placeholder="اكتب هنا..."
        value={cancellationReason}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setCancellationReason(e.target.value)
        }
      />
    </ModelForm>
  );
};

export default CancelOrderModal;
