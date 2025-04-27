// Third-Party =====> sweetalert
import Swal from "sweetalert";
/** ----------------------------------------------
      * @description Asks the user for confirmation before proceeding with a deletion operation.
      * @param {String} confirmMsg The message to display when asking for confirmation.
      * @returns {Promise<Boolean>} A promise that resolves to a boolean value indicating whether the user confirmed the deletion.
   -------------------------------------------------*/

const confirmDeletion = async (confirmMsg?: string): Promise<boolean> => {
  const willDelete = await Swal({
    title: "Are you sure?",
    text: confirmMsg || "You cannot undo this action later.",
    icon: "warning",
    buttons: ["Cancel", "Confirm"],
  });
  return willDelete;
};

export default confirmDeletion;
