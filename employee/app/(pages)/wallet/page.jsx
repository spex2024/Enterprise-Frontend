import React from "react";

import CarbonStats from "../../../components/page-ui/carbon-stats";

const WalletDashboard = () => {
  return (
    <div
      className={`w-full min-h-screen flex  flex-col py-10 bg-gray-200 px-32`}
    >
      <CarbonStats />
    </div>
  );
};

export default WalletDashboard;
