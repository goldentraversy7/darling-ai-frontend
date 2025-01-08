import { motion } from "framer-motion";
import Chart from "./widgets/Chart";
import Ticker from "./widgets/Ticker";
import MarketOverview from "./widgets/MarketOverview";
import MarketData from "./widgets/MarketData";
import { Stack } from "@mui/material";

const TradingViewTab = (props) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
      className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32 mr-32 w-full"
    >
      <Ticker />
      <Chart />
      <Stack
        spacing={2}
        className="mt-32 w-full"
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
      >
        <MarketOverview className="xs:w-full sm:w-1/3" />
        <MarketData className="xs:w-full sm:w-2/3" />
      </Stack>
    </motion.div>
  );
};

export default TradingViewTab;
