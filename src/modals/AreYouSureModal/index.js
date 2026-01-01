import { Button } from "@/components/Core/Button";
import { FiAlertTriangle } from "react-icons/fi";
import classes from "./AreYouSureModal.module.css";
import { FaTrash } from "react-icons/fa6";
import { Modal } from "react-bootstrap";

const AreYouSureModal = ({
  show,
  setShow,
  title = "Are You Sure You Want To Delete ",
  subTitle = "Once you delete this can’t be recovered",
  onClick,
  isApiCall,
  modalIcon = <FaTrash size={45} color="var(--primary-color)" />,
}) => {
  return (
    <>
      <style>{`
        .modal-content {
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
        }
        .modal-body {
          padding: 40px 32px;
          height:auto;
        }
        .modal-header {
          flex-direction: column;
          background: var(--main-color);
           border-bottom: none;

          justify-content: center !important;
          padding: 0.75rem;~
        }
        .name {
          font-size: 18px;
          color: var(--text-color-black);
        }
      `}</style>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
          }}
          centered
        >
          <Modal.Body>
            <div className={classes.content}>
              <div className={classes.mainDiv}>
                <div className={classes.__icon}>{modalIcon}</div>
                <p className={classes.title}>{title}</p>
                <p className={[classes.message].join(" ")}>{subTitle}</p>
              </div>
              <div className={classes.btnsBox}>
                <Button
                  className={classes.yesBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                  disabled={isApiCall}
                  type="square"
                >
                  {isApiCall ? "Wait" : "Yes"}
                </Button>
                <Button
                  className={classes.noBtn}
                  onClick={async (e) => {
                    e.stopPropagation();
                    setShow(false);
                  }}
                  disabled={isApiCall}
                  type="square"
                  variant="gray"
                >
                  No
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AreYouSureModal;
