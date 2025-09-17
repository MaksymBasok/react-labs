const Profile = ({ name, role, avatarUrl, ...props }) => {
    return (
        <div className="card" {...props}>
            <img src={avatarUrl} alt={name} className="avatar" />
            <h3>{name}</h3>
            <p>{role}</p>
        </div>
    );
};

export default Profile;
