import DummyContent from "../components/DummyContent.jsx";
import { api } from "../api.js";

export default function UserPage() {
  return (
    <div className="page">
      <h2 className="page-title">User Dashboard</h2>
      <DummyContent title="User Content" fetcher={api.getUserContent} />
    </div>
  );
}
