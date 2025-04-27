// My-Components
import Button from "@components/common/buttons/Button";
import LoadingSpinner from "@components/common/Loading/LoadingSpinner";

type TModelHFooterProps = {
  isSubmitting?: boolean;
  onModelClose: (param: boolean) => void;
};

const ModelFooter = ({
  isSubmitting = false,
  onModelClose,
}: TModelHFooterProps) => {
  // ################### CONTENT ###################
  let content;
  if (isSubmitting) content = <LoadingSpinner size="loading-lg" />;
  else
    content = (
      <>
        <Button color="primary" type="submit" size="md">
          حفظ
        </Button>
        <Button
          color="error"
          type="submit"
          size="md"
          onClick={() => onModelClose(false)}
        >
          الغاء
        </Button>
      </>
    );

  return <footer className="flex-center mt-12 gap-4">{content}</footer>;
};

export default ModelFooter;
