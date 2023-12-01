import { useState, useCallback } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MODAL_FALSE, MODAL_TRUE } from "../services/actions/modal";
import { useDispatch } from "react-redux";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const openModal = useCallback((e) => {
    // e.stopPropagation();
    dispatch({
      type: MODAL_TRUE,
    });
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback((e) => {
    //e.stopPropagation();
    dispatch({
      type: MODAL_FALSE,
    });
    navigate("/");
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
