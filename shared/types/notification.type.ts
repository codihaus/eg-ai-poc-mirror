export interface TypeNotification {
    type?: "success" | "warning" | "danger" | "primary" | null;
    title?: String;
    description?: String;
    title_close?: String;
    title_confirm?: String;
    handleConfirm?: () => void;
    handleClose?: () => void;
    notClickOutside?: boolean;
}
