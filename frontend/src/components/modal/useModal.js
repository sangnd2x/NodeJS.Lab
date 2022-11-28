import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    toggle,
  }
};

export default useModal;