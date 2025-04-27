// React
import { ChangeEvent, useEffect, useRef, useState } from "react";
// My-Components
import Button from "@components/common/buttons/Button";
import LoadingSpinner from "@components/common/Loading/LoadingSpinner";
// Icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
import confirmDeletion from "@libs/sweetalert/confirmDeletion";

const Category = ({ index, name }: { index: number; name: string }) => {
  // ################### REACT HOOKS ###################
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const inputField = useRef<HTMLInputElement | null>(null);

  // ################### ASYNC REQUEST ###################
  const handleUpdate = async () => {
    try {
      // Validation
      if (categoryName === name) {
        toastifyMsg("Change before save.", "error");
      } else if (categoryName?.trim() === "") {
        toastifyMsg("The name field is require.", "error");
      } else {
        setIsUpdating(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toastifyMsg("Operation completed successfully", "success");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const willDelete = await confirmDeletion();
    if (willDelete) {
      try {
        setIsUpdating(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toastifyMsg("Operation completed successfully", "success");
      } catch (err) {
        console.log(err);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  // ################### HANDLER ###################
  // ========== Reset State
  const handleCleanUp = () => {
    setIsEditMode(false);
    setCategoryName("");
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    if (isEditMode && inputField.current) {
      inputField.current.focus();
    }
  }, [isEditMode]);

  return (
    <>
      <td>{index + 1}</td>
      <td>
        {isEditMode ? (
          <input
            ref={inputField}
            type="text"
            name="name"
            placeholder="Write here..."
            defaultValue={name}
            className="input-field rounded-md p-2"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCategoryName(e.target.value)
            }
          />
        ) : (
          name
        )}
      </td>

      {isUpdating ? (
        <td>
          <LoadingSpinner size="loading-md" color="text-primary" />
        </td>
      ) : (
        <td className="flex-center gap-2">
          {isEditMode ? (
            <>
              <Button color="primary" size="sm" onClick={() => handleUpdate()}>
                Save
              </Button>
              <Button color="error" size="sm" onClick={handleCleanUp}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <button
                className="icon-wraper edit-icon"
                onClick={() => setIsEditMode(true)}
              >
                <MdOutlineModeEdit />
              </button>
              <button
                className="icon-wraper delete-icon"
                onClick={handleDelete}
              >
                <RiDeleteBin6Line />
              </button>
            </>
          )}
        </td>
      )}
    </>
  );
};

export default Category;
