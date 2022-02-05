import { useState } from "react";

export const useModal = () => {
  return useState({ show: false, data: {} });
};
