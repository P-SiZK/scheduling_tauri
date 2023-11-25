import { XMarkIcon } from '@heroicons/react/24/solid';

export type TitledModalProps = React.PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title: string;
}>;

export function TitledModal({
  children,
  title,
  open,
  onClose,
}: TitledModalProps) {
  return (
    <dialog
      className="modal backdrop-brightness-50"
      open={open}
      onClose={onClose}
    >
      <div className="modal-box w-auto">
        <form method="dialog">
          <button
            type="submit"
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </form>
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="divider" />
        {children}
      </div>
      <form method="dialog" className="modal-backdrop shadow-lg">
        <button type="submit" className="cursor-default">
          close
        </button>
      </form>
    </dialog>
  );
}
