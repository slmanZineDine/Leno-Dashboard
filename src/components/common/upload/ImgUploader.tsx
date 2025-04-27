// React
import { ChangeEvent, useEffect, useState } from "react";
// My-Hooks
import useOutsideClick from "@hooks/common/useOutsideClick";
// Icons
import { BiEdit } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
// Images
import userAvatar from "@assets/images/user_avatar.png";
import imageAvatar from "@assets/images/image_avatar.jpg";

type TImgUploader = {
  currentImgUrl?: string | null;
  newImgUrl?: string;
  onImageUpload: (operation: any) => void;
  onImageDelete: () => void;
  containerSize: string;
  isCircle?: boolean;
};

const ImgUploader = ({
  currentImgUrl = null,
  onImageUpload,
  onImageDelete,
  containerSize,
  isCircle = true,
}: TImgUploader) => {
  // ################### REACT HOOKS ###################
  const [imgURL, setImgURL] = useState<string | null>(currentImgUrl);

  // ################### CUSTOM HOOKS ###################
  const [isOpen, setIsOpen, containerElement] = useOutsideClick();

  // ################### HANDLER ###################
  // ===== REMOVE =====
  const handleRemoveImg = () => {
    setImgURL(null);
    setIsOpen(false);
    onImageDelete();
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    if (currentImgUrl) {
      setImgURL(currentImgUrl);
    }
  }, [currentImgUrl]);

  return (
    <div className="relative" ref={containerElement}>
      <div
        className={`flex-center ${isCircle ? "rounded-full" : "rounded-xl"} bg-[#f7f7f7] ${containerSize}`}
      >
        <img
          src={imgURL ? imgURL : isCircle ? userAvatar : imageAvatar}
          alt="User-Img"
          className={`size-full ${isCircle ? "rounded-full" : "rounded-xl"} object-cover`}
        />
        {!imgURL ? (
          <label
            className={`flex-center absolute end-0 bottom-0 size-9 ${isCircle ? "translate-x-1/4" : "translate-x-0"} bg-primary cursor-pointer rounded-full border-2 border-white`}
            htmlFor="user-img"
          >
            <FaCamera className="cursor-pointer text-white" />
          </label>
        ) : (
          <div
            className={`flex-center absolute end-0 bottom-0 size-9 ${isCircle ? "translate-x-1/4" : "translate-x-0"} bg-primary cursor-pointer rounded-full border-2 border-white`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <HiDotsHorizontal
              className={`text-xl text-white transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        )}

        {isOpen && (
          <ul className="shadow-homeBox text-text bg-body-bg bg-body-bg absolute top-[105%] left-0 z-10 w-28 rounded-md p-1">
            <li>
              <label
                htmlFor="user-img"
                className="text-md hover:bg-hover flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors duration-300"
              >
                <BiEdit className="text-lg text-green-500" />
                تعديل
              </label>
            </li>
            <li
              className="text-md hover:bg-hover flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors duration-300"
              onClick={handleRemoveImg}
            >
              <RiDeleteBin6Line className="text-lg text-red-500" />
              حذف
            </li>
          </ul>
        )}
        <input
          type="file"
          id="user-img"
          hidden
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setIsOpen(false);
            const files = e.target.files;
            if (files && files[0]) {
              onImageUpload(files[0]);
              setImgURL(URL.createObjectURL(files[0]));
            }
          }}
        />
      </div>
    </div>
  );
};

export default ImgUploader;
