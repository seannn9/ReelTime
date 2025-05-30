import "../styles/components/Modal.css";

export default function Modal({
    action,
    onSubmit,
    closeModal,
    headingMsg,
    subHeadingMsg,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            onSubmit();
        } finally {
            closeModal();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{headingMsg}</h2>
                <p
                    style={{
                        margin: "0",
                        fontStyle: "italic",
                    }}
                >
                    {subHeadingMsg}
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="modal-btns">
                        <button type="submit">{action}</button>
                        <button type="button" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
