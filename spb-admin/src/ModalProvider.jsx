import createProvider from "./ui/Modal/create";
import {
  ADD_ADMIN_MODAL,
  ADD_BANNER,
  UPDATE_BANNER,
  DELETE_BANNER,
} from "./constants/modals";
import AddAdmin from "./containers/signup/addAdminContainer";
import AddBanner from "./containers/management/AddBannerContainer";
import UpdateBanner from "./containers/management/UpdateBannerContainer";
import DeleteBanner from "./containers/management/DeleteBannerContainer";

export default createProvider({
  [ADD_ADMIN_MODAL]: AddAdmin,
  [ADD_BANNER]: AddBanner,
  [UPDATE_BANNER]: UpdateBanner,
  [DELETE_BANNER]: DeleteBanner,
});
