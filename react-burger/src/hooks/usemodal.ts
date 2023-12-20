import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MODAL_FALSE, MODAL_TRUE } from "../services/actions/modal";

import { useAppDispatch } from "../services/utils/hooks";

export const useModal = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const openModal = useCallback(() => {
    dispatch({
      type: MODAL_TRUE,
    });
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch({
      type: MODAL_FALSE,
    });
    navigate("/");
  }, [dispatch, navigate]);

  return {
    openModal,
    closeModal,
  };
};
