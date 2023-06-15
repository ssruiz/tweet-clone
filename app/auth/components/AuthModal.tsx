'use client';

import AuthForm from './AuthForm';
import Modal from '@/app/components/Modal';

const AuthModal = () => {
  return (
    <Modal appear isRoute show>
      <AuthForm />
    </Modal>
  );
};

export default AuthModal;
