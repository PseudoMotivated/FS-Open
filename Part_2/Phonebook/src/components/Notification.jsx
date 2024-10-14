const Notification = ({ notif }) => {

    if (notif == null) {
        return (
            null
        )
    } else if (notif.type == "error") {
        return (
            <div className="notification-error">
                <p><strong>Error</strong>: {notif.content}</p>
            </div>
        )
    } else if (notif.type == "alert") {
        return (
            <div className="notification-alert">
                <p><strong>Alert</strong>: {notif.content}</p>
            </div>
        )
    } else {
        return (
            <div className="notification">
                <p><strong>Notification</strong>: {notif.content}</p>
            </div>
        )
    }
}

export default Notification