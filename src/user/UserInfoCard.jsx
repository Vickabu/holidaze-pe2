export default function UserInfoCard({ user }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <img
        src={user.avatar?.url}
        alt={user.avatar?.alt || "Brukeravatar"}
        className="w-24 h-24 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold">{user.name}</p>
        <p>{user.email}</p>
        <p>Rolle: {user.venueManager ? "Venue Manager" : "Customer"}</p>
      </div>
    </div>
  );
}