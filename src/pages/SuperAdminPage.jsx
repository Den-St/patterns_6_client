import UserSearch from "../components/UserSearch.jsx";
import DummyContent from "../components/DummyContent.jsx";
import { api } from "../api.js";

export default function SuperAdminPage() {
  return (
    <div className="page">
      <h2 className="page-title">Super Admin Dashboard</h2>
      <UserSearch />
      <DummyContent title="Super Admin Content" fetcher={api.getSuperAdminContent} />
    </div>
  );
}
