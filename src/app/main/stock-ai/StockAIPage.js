import { styled } from "@mui/material/styles";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useThemeMediaQuery } from "@fuse/hooks";
import StockAIHeader from "./StockAIHeader";
import StockAIContent from "./StockAIContent";

const Root = styled(FusePageCarded)(({ theme }) => ({
  "& .FusePageCarded-header": {
    backgroundColor: theme.palette.background.paper,
  },
  "& .container": {
    borderRadius: 0,

    "& .FusePageCarded-wrapper": {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

function StockAIPage(props) {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Root
      header={<StockAIHeader />}
      content={<StockAIContent />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default StockAIPage;
