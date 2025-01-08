import { Avatar } from "@mui/material";
import { getProviderIconUrl } from "app/store/providersSlice";

function ProviderLogo({ provider, className, size = "small" }) {
  return (
    <Avatar
      src={getProviderIconUrl(provider, size)}
      alt={provider.slug}
      sx={{ borderWidth: 2, borderColor: "#3A98D4" }}
      className={className}
    />
  );
}

export default ProviderLogo;
