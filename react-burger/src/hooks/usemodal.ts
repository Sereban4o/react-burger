import { useCallback } from "react";
import { useNavigate } from "react-router-dom";


import { useAppDispatch } from "../services/utils/hooks";
import { modalFalseAction, modalTrueAction } from "../services/actions/modal";

export const useModal = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const openModal = useCallback(() => {
    dispatch(modalTrueAction());
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch(modalFalseAction());
    navigate(-1);
  }, [dispatch, navigate]);

  return {
    openModal,
    closeModal,
  };
}; 
