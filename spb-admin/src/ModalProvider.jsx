import createProvider from "./ui/Modal/create";
import { ADD_ADMIN_MODAL } from "./constants/modals";
import AddAdmin from "./containers/signup/addAdminContainer";

export default createProvider({
  [ADD_ADMIN_MODAL]: AddAdmin,
});
