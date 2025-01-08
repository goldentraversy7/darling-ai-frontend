import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

function DashboardHeader(props) {
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-24 md:text-32 font-extrabold tracking-tight leading-none"
        >
          Advanced Stock Analysis
        </Typography>
      </div>
    </div>
  );
}

export default DashboardHeader;
