'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';

import { Fragment, useCallback } from 'react';

interface Props {
  children?: React.ReactNode;
  show?: boolean;
  appear?: boolean;
  isRoute?: boolean;
  onClose?: () => void;
}

const Modal: React.FC<Props> = ({
  appear = false,
  children,
  show,
  isRoute = false,
  onClose,
}) => {
  const router = useRouter();

  const closeModal = useCallback(() => {
    if (isRoute) router.back();
    else if (onClose) onClose();
  }, [isRoute, onClose, router]);

  return (
    <Transition appear={appear} show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-fit transform overflow-hidden rounded-2xl bg-brand-black p-6 text-left align-middle shadow-xl transition-all">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
