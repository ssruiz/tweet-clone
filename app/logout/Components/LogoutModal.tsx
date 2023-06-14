import Modal from '@/app/components/Modal';
import LogoutForm from './LogoutForm';

const LogoutModal = () => {
  return (
    <Modal appear isRoute show>
      <LogoutForm />
    </Modal>
  );
};

export default LogoutModal;
