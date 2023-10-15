import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-app-light flex justify-between items-center w-full fixed p-2">
      <div className="text-2">Palestine</div>
      <div className="flex items-center gap-2">
        <Link className="app-btn" href="/">
          Download
        </Link>
        <Link className="app-btn" href="/">
          About
        </Link>
        <Link className="app-btn" href="/">
          Contact
        </Link>
        <Link className="app-btn" href="/">
          Donate
        </Link>
      </div>
    </header>
  );
}
