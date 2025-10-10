import { Routes, Route } from "react-router-dom";
import StoreLayout from "../../../layout/storelayout/StoreLayout";
import StoreOverview from "../storeoverview/StoreOverview";
import ShirtDetail from "../ShopDetail/ShirtDetail";

export default function StoreRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StoreLayout />}>
        <Route index element={<StoreOverview />} />
        <Route path=":gender" element={<StoreOverview />} />
        <Route path="tshirts/:id" element={<ShirtDetail />} />
      </Route>
    </Routes>
  );
}