export default function ProfileCard({ name, email, avatarUrl }) {
  return (
    <div className="profileCard">
      <div className="avatarWrapper">
        <img src={avatarUrl} alt={name} className="avatar" />
      </div>
      <div>
        <h2 className="profileName">{name}</h2>
        <p className="profileEmail">{email}</p>
      </div>
    </div>
  );
}
