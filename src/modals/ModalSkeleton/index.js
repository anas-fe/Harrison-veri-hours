"use client";

import { Modal } from "react-bootstrap";
import classes from "./modalSkeleton.module.css";
import { AiOutlineClose } from "react-icons/ai";
import Statuses from "@/components/Statuses";

export default function ModalSkeleton({
  show,
  setShow,
  header,
  footer,
  children,
  modalClass,
  hideHeaderBorder = false,
  headerStyles,
  footerStyles,
  showCloseIcon,
  width,
  borderLine = true,
  headerClass,
  hideModalBg = false,
  variant = "primary",
  footerClass,
  height = true,
  status = false,
}) {
  function handleClose() {
    setShow(false);
  }
  return (
    <>
      <style>{`
        .modal-dialog-centered {
          height: 100% !important;
        }
        .modal-header {
          padding: ${variant === "secondary" && "14px 22px"};
          border-bottom: none !important;
        }

        .modal-footer {
          border-top: none !important;
          justify-content: flex-start !important;
        }

        .${classes.header} button {
          color: var(--black-color) !important;
        }
        .modal-content {
          margin: ${true ? `0 auto 0 auto` : `0 0 0 auto`};
          background-color: ${hideModalBg ? "transparent" : ""};
          border: ${hideModalBg ? "none" : ""};
          }
        .modal-body{
          max-height: 80vh;

        }
        .modal .modal-dialog {
          max-width: ${width};
          margin: ${true ? `0 auto 0 auto` : `0 0 0 auto`};
        }
        .modal-backdrop {
          backdrop-filter: blur(25px) !important;
          -webkit-backdrop-filter: blur(25px) !important;
        }
        @media screen and (max-width: 992px) {
          .modal .modal-dialog {
            max-width: 70%;
          }
        }
        @media screen and (max-width: 768px) {
          .modal .modal-dialog {
            max-width: 80%;
          }
        }
        @media screen and (max-width: 575px) {
          .modal .modal-dialog {
            max-width: 90%;
          }
        }
      `}</style>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className={classes.modal}
        contentClassName={classes.modalContent}
      >
        {header && (
          <Modal.Header
            // closeButton
            className={`${[
              classes.header,
              status && classes.statusHeader,
              variant === "secondary" && classes.secondaryHeader,
              headerClass && headerClass,
            ].join(" ")}`}
            style={{ ...headerStyles }}
          >
            <h4>{header}</h4>
            {status && <Statuses status={status} />}
          </Modal.Header>
        )}
        {showCloseIcon && (
          <>
            <div className={classes.iconBox} onClick={handleClose}>
              <AiOutlineClose size={20} color="var(--text-color)" />
            </div>
          </>
        )}
        <Modal.Body
          className={`${[classes.body, modalClass && modalClass].join(" ")}`}
        >
          {children}
        </Modal.Body>
        {footer && (
          <Modal.Footer
            className={`${[classes.footer, footerClass && footerClass].join(
              " "
            )}`}
            style={{
              //   borderTop: `1px solid ${Colors.neutralShadesOfGainsboro}`,
              ...footerStyles,
            }}
          >
            {footer}
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
