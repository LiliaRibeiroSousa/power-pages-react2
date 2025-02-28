import { useEffect, useState, useRef } from "react";
import KPIItem from "../components/KPIItem.jsx";


const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const searchRef = useRef(null);
  const roleDropdownRef = useRef(null);
  const [counts, setCounts] = useState({
    invited: 0,
    locked: 0,
    deactivated: 0,
    active: 0,
  });

  useEffect(() => {
    fetch("src/mockData/contacts.json")
      .then((response) => response.json())
      .then((data) => {
        let invited = 0,
          locked = 0,
          deactivated = 0,
          active = 0;

        data.forEach((contact) => {
          switch (contact.new_portalstatus) {
            case "2":
              invited++;
              break;
            case "4":
              locked++;
              break;
            case "5":
              deactivated++;
              break;
            case "3":
              active++;
              break;
            default:
              break;
          }
        });

        setCounts({ invited, locked, deactivated, active });
        setContacts(data);
        setFilteredContacts(data);
      })
      .catch((error) => console.error("Error fetching mock contacts:", error));
  }, []);

  // Filter contacts based on search query and selected roles
  const handleFilter = () => {
    let filtered = contacts;

    if (searchQuery) {
      filtered = filtered.filter(
        (contact) =>
          contact.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.lastname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRoles.length > 0) {
      filtered = filtered.filter((contact) =>
        selectedRoles.includes(contact.jobtitle)
      );
    }

    setFilteredContacts(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [searchQuery, selectedRoles, contacts]);

  // Toggle role selection
  const toggleRoleSelection = (role) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
  };

  // Reset role filters
  const resetRoles = () => {
    setSelectedRoles([]);
  };

  // Hide search and dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (!searchQuery) setShowSearch(false);
      }
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target)
      ) {
        setShowRoleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  // Get unique roles from contacts
  const allRoles = [...new Set(contacts.map((c) => c.jobtitle))];

  return (
    <div className="contacts-page">
      {/* Breadcrumb and Header */}
      <div className="breadcrumb-container">
        <a href="/" className="btn button1">
          Invite User
        </a>
      </div>

      {/* KPI Section using reusable KPIItem components */}
      <div className="kpi-container">
        <KPIItem
          icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxNGFmZTYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZW5kIj48cGF0aCBkPSJNMTQuNTM2IDIxLjY4NmEuNS41IDAgMCAwIC45MzctLjAyNGw2LjUtMTlhLjQ5Ni40OTYgMCAwIDAtLjYzNS0uNjM1bC0xOSA2LjVhLjUuNSAwIDAgMC0uMDI0LjkzN2w3LjkzIDMuMThhMiAyIDAgMCAxIDEuMTEyIDEuMTF6Ii8+PHBhdGggZD0ibTIxLjg1NCAyLjE0Ny0xMC45NCAxMC45MzkiLz48L3N2Zz4="
          count={counts.invited}
          label="Invited Users"
          color="#14AFE6"
          imageBgColor="#e6f7ff"
        />
        <KPIItem
          icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmIxM2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1sb2NrIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTEiIHg9IjMiIHk9IjExIiByeD0iMiIgcnk9IjIiLz48cGF0aCBkPSJNNyAxMVY3YTUgNSAwIDAgMSAxMCAwdjQiLz48L3N2Zz4="
          count={counts.locked}
          label="Locked Users"
          color="#FFB13C"
          imageBgColor="#fff3e6"
        />
        <KPIItem
          icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmNjU4NTgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS14Ij48cGF0aCBkPSJNMTggNiA2IDE4Ii8+PHBhdGggZD0ibTYgNiAxMiAxMiIvPjwvc3ZnPg=="
          count={counts.deactivated}
          label="Deactivated Users"
          color="#F65858"
          imageBgColor="#ffe6e6"
        />
        <KPIItem
          icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MWM2ODYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGVjayI+PHBhdGggZD0iTTIwIDYgOSAxN2wtNS01Ii8+PC9zdmc+"
          count={counts.active}
          label="Active Users"
          color="#41C686"
          imageBgColor="#e6ffe6"
        />
      </div>

      <div className="table-container">
        {/* Search & Filters */}
        <div className="filter-container">
          <div className="search-container" ref={searchRef}>
            {!showSearch ? (
              <svg
                className="table-search"
                onClick={() => setShowSearch(true)}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            ) : (
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={handleFilter}
                autoFocus
              />
            )}
          </div>

          {/* Role Filter Dropdown with Multi-Choice Checkboxes */}
          <div className="filter-wrapper" ref={roleDropdownRef}>
          <button 
            className="filter-button" 
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}>
            Role <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>{selectedRoles.length > 0 && <span className="filter-count">{`(${selectedRoles.length})`}</span>}
            </button>

            {showRoleDropdown && (
              <div className="dropdown-menu">
                {allRoles.map((role, index) => (
                  <div key={index} className="dropdown-item">
                    <input
                      type="checkbox"
                      id={`role-${index}`}
                      checked={selectedRoles.includes(role)}
                      onChange={() => toggleRoleSelection(role)}
                    />
                    <label htmlFor={`role-${index}`}>{role}</label>
                  </div>
                ))}
                <div className="dropdown-item reset-option"  onClick={resetRoles}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>Reset filters
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contacts Table */}
        <table className="custom-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Creation Date</th>
              <th>Role</th>
              <th>Account Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.firstname || "Unknown"}</td>
                <td>{contact.lastname || "Unknown"}</td>
                <td>{contact.emailaddress1 || "Unknown"}</td>
                <td>
                  {new Date(contact.createdon).toLocaleDateString() ||
                    "Unknown"}
                </td>
                <td>{contact.jobtitle || "Unknown"}</td>
                <td>
                  {(() => {
                    switch (contact.new_portalstatus) {
                      case "2":
                        return (
                          <span className="status invited">Invited</span>
                        );
                      case "4":
                        return (
                          <span className="status locked">Locked</span>
                        );
                      case "5":
                        return (
                          <span className="status deactivated">
                            Deactivated
                          </span>
                        );
                      case "3":
                        return (
                          <span className="status active">Active</span>
                        );
                      default:
                        return <span className="status">Unknown</span>;
                    }
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
