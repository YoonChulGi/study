import React from "react";
import AsyncComponent from "./AsyncComponent";

export default function AsyncMainPage() {
  return <AsyncComponent loader={() => import("./components/main/MainPage")} />;
}
