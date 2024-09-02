import React from "react";

import PackStats from "../../../components/page-ui/pack-stats";
import ReturnPack from "../../../components/page-ui/return-pack";

const PackDashboard = () => {
  return (
    <div
      className={`w-full min-h-screen flex  flex-col items-center justify-center bg-gray-200 px-32`}
    >
      <PackStats />
      <ReturnPack />
    </div>
  );
};

export default PackDashboard;
