// React
import { useState } from "react";
// Third-Party =====> react-router-dom
import { useParams } from "react-router-dom";
// My-Components
import Loading from "@components/common/Loading/Loading";
import BoxHeader from "@components/common/box/BoxHeader";
import BoxContainer from "@components/common/box/BoxContainer";
import HeadingSection from "@components/common/sections/HeadingSection";
import PermissionsTable from "@components/dashboard/permissions/PermissionsTable";
// Types
import type { TUserTypes } from "@customTypes/user/user";

const EditRole = () => {
  // ################### REACT-ROUTER HOOKS ###################
  const { prefix: roleName } = useParams() as TParamsType;

  // ################### REACT HOOKS ###################
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>(
    Array.from({ length: 31 }, (_, i) => i + 1),
  );

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title="Edit Role" />

      {/* ========================== Loading ========================== */}
      <Loading isLoading={false}>
        {/* ========================== Content ========================== */}
        <section className="container">
          <BoxContainer className="bg-box-bg">
            <BoxHeader title={roleName as string} titleColor="!text-2xl" />

            {/* ========================== Form ========================== */}
            <PermissionsTable
              roleName={roleName as TUserTypes}
              rolePermissions={selectedPermissions}
              defaultPermissions={Array.from({ length: 20 }, (_, i) => i + 1)}
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
            />
          </BoxContainer>
        </section>
      </Loading>
    </>
  );
};

export default EditRole;
