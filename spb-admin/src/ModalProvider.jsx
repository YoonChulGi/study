import createProvider from "./ui/Modal/create";
import { ADD_ADMIN_MODAL, MANAGE_BANNER } from "./constants/modals";
import AddAdmin from "./containers/signup/addAdminContainer";
import ManageBanner from "./containers/management/ManageBannerContainer";

export default createProvider({
  [ADD_ADMIN_MODAL]: AddAdmin,
  [MANAGE_BANNER]: ManageBanner,
});
