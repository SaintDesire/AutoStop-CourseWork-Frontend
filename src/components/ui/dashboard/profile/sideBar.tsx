import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li className="active">
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
