import UserSearch from "../components/UserSearch.jsx";
import DummyContent from "../components/DummyContent.jsx";
import { api } from "../api.js";

export default function AdminPage() {
  return (
    <div className="page">
      <h2 className="page-title">Admin Dashboard</h2>
      <UserSearch />
      <DummyContent title="Admin Content" fetcher={api.getAdminContent} />
    </div>
  );
}
