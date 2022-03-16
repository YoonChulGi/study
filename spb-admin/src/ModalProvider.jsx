import createProvider from "./ui/Modal/create";
import { ADD_ADMIN_MODAL, ADD_BANNER } from "./constants/modals";
import AddAdmin from "./containers/signup/addAdminContainer";
import AddBanner from "./containers/management/AddBannerContainer";

export default createProvider({
  [ADD_ADMIN_MODAL]: AddAdmin,
  [ADD_BANNER]: AddBanner,
});
