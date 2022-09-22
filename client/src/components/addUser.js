function AddUser() {
    return (
        <div className="form">
            <form className="form" action="/users" method="POST">
                <div className="form-control">
                    <input type="text" name="user" id="user" />
                </div>
                <button className="btn" type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;