import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./inventory.module.css";

// Mock inventory data - make it mutable for delete operations
const INITIAL_INVENTORY = [
  { id: 1, name: "Canned Food Items", description: "Non-perishable goods", site: "Field Office NCR", location: "Main Warehouse", date: "Jan 15, 2025", time: "2:30 PM", quantity: 150, unit: "units", category: "Food", status: "Available", icon: "🥫" },
  { id: 2, name: "Winter Clothing", description: "Coats, jackets, sweaters", site: "Field Office CAR", location: "Storage Room B", date: "Jan 14, 2025", time: "10:15 AM", quantity: 75, unit: "items", category: "Clothing", status: "Reserved", icon: "🧥" },
  { id: 3, name: "Medical Supplies", description: "First aid kits, bandages", site: "Field Office I", location: "Medical Storage", date: "Jan 13, 2025", time: "4:45 PM", quantity: 25, unit: "kits", category: "Medical", status: "Available", icon: "🏥" },
  { id: 4, name: "Blankets & Bedding", description: "Thermal blankets, sheets", site: "Field Office II", location: "Warehouse A", date: "Jan 12, 2025", time: "9:20 AM", quantity: 120, unit: "sets", category: "Bedding", status: "Available", icon: "🛏️" },
  { id: 5, name: "Hygiene Kits", description: "Toiletries and personal care", site: "Field Office III", location: "Storage Room C", date: "Jan 11, 2025", time: "3:15 PM", quantity: 200, unit: "kits", category: "Hygiene", status: "Distributed", icon: "🧼" },
  { id: 6, name: "Baby Supplies", description: "Diapers, formula, wipes", site: "Field Office NCR", location: "Main Warehouse", date: "Jan 10, 2025", time: "11:30 AM", quantity: 85, unit: "packs", category: "Baby", status: "Available", icon: "👶" },
  { id: 7, name: "Drinking Water", description: "Bottled water bottles", site: "Field Office CAR", location: "Inventory Room", date: "Jan 09, 2025", time: "1:45 PM", quantity: 500, unit: "bottles", category: "Beverages", status: "Reserved", icon: "💧" },
  { id: 8, name: "First Aid Kits", description: "Complete emergency first aid", site: "Field Office I", location: "Medical Storage", date: "Jan 08, 2025", time: "2:00 PM", quantity: 40, unit: "boxes", category: "Medical", status: "Available", icon: "🏥" },
];

const SITES = ["All Sites", "Field Office NCR", "Field Office CAR", "Field Office I", "Field Office II", "Field Office III"];
const CATEGORIES = ["All Categories", "Food", "Clothing", "Medical", "Bedding", "Hygiene", "Baby", "Beverages"];
const STATUSES = ["All Status", "Available", "Reserved", "Distributed"];

const STATUS_STYLES = {
  "Available": styles.statusAvailable,
  "Reserved": styles.statusReserved,
  "Distributed": styles.statusDistributed,
};

// Edit Modal Component
function EditModal({ item, onClose, onSave }: { item: any; onClose: () => void; onSave: (updatedItem: any) => void }) {
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    quantity: item.quantity,
    unit: item.unit,
    site: item.site,
    location: item.location,
    status: item.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...item, ...formData });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalLarge}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Edit Item</h3>
          <button onClick={onClose} className={styles.modalCloseButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Item Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Unit</label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Site</label>
              <select
                value={formData.site}
                onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                className={styles.formSelect}
              >
                {SITES.filter(s => s !== "All Sites").map((site) => (
                  <option key={site} value={site}>{site}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={styles.formSelect}
              >
                {STATUSES.filter(s => s !== "All Status").map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.modalCancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.modalSaveButton}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// View Modal Component
function ViewModal({ item, onClose }: { item: any; onClose: () => void }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalLarge}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Item Details</h3>
          <button onClick={onClose} className={styles.modalCloseButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={styles.viewDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Item Name:</span>
            <span className={styles.detailValue}>{item.name}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Description:</span>
            <span className={styles.detailValue}>{item.description}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Category:</span>
            <span className={styles.detailValue}>{item.category}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Quantity:</span>
            <span className={styles.detailValue}>{item.quantity} {item.unit}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Site:</span>
            <span className={styles.detailValue}>{item.site}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Location:</span>
            <span className={styles.detailValue}>{item.location}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Date Added:</span>
            <span className={styles.detailValue}>{item.date} at {item.time}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Status:</span>
            <span className={`${styles.statusBadge} ${STATUS_STYLES[item.status as keyof typeof STATUS_STYLES]}`}>
              {item.status}
            </span>
          </div>
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.modalCancelButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statContent}>
        <p className={styles.statLabel}>{label}</p>
        <p className={styles.statValue}>{value}</p>
      </div>
    </div>
  );
}

function InventoryRow({ 
  item, 
  selected, 
  onSelect, 
  onView, 
  onEdit, 
  onDelete,
  isDeleting 
}: { 
  item: typeof INITIAL_INVENTORY[0]; 
  selected: boolean; 
  onSelect: (id: number) => void; 
  onView: (id: number) => void; 
  onEdit: (id: number) => void; 
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}) {
  const statusStyle = STATUS_STYLES[item.status as keyof typeof STATUS_STYLES] || styles.statusAvailable;
  
  return (
    <tr className={`${styles.tableRow} ${isDeleting ? styles.tableRowDeleting : ""}`}>
      <td className={styles.tableCell}>
        <input 
          type="checkbox" 
          checked={selected} 
          onChange={() => onSelect(item.id)} 
          className={styles.checkbox}
          disabled={isDeleting}
        />
      </td>
      <td className={styles.tableCell}>
        <div className={styles.itemCell}>
          <div className={styles.itemIcon}>{item.icon}</div>
          <div className={styles.itemInfo}>
            <p className={styles.itemName}>{item.name}</p>
            <p className={styles.itemDescription}>{item.description}</p>
          </div>
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.siteInfo}>
          <p className={styles.siteName}>{item.site}</p>
          <p className={styles.siteLocation}>{item.location}</p>
        </div>
      </td>
      <td className={styles.tableCell}>{item.date}</td>
      <td className={styles.tableCell}>{item.time}</td>
      <td className={styles.tableCell}>{item.quantity} {item.unit}</td>
      <td className={styles.tableCell}>
        <span className={`${styles.statusBadge} ${statusStyle}`}>{item.status}</span>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.actionCell}>
          <button 
            onClick={() => onView(item.id)} 
            className={`${styles.iconButton} ${styles.viewButton}`} 
            title="View Details"
            disabled={isDeleting}
          >
            <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button 
            onClick={() => onEdit(item.id)} 
            className={`${styles.iconButton} ${styles.editButton}`} 
            title="Edit Item"
            disabled={isDeleting}
          >
            <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(item.id)} 
            className={`${styles.iconButton} ${styles.deleteButton}`} 
            title="Delete Item"
            disabled={isDeleting}
          >
            <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function Inventory() {
  const router = useRouter();
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [selectedSite, setSelectedSite] = useState("All Sites");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [viewingItem, setViewingItem] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const itemsPerPage = 10;

  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSite = selectedSite === "All Sites" || item.site === selectedSite;
      const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
      const matchesStatus = selectedStatus === "All Status" || item.status === selectedStatus;
      return matchesSite && matchesCategory && matchesStatus;
    });
  }, [inventory, selectedSite, selectedCategory, selectedStatus]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    total: inventory.length,
    available: inventory.filter((i) => i.status === "Available").length,
    reserved: inventory.filter((i) => i.status === "Reserved").length,
    distributed: inventory.filter((i) => i.status === "Distributed").length,
  };

  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === paginatedItems.length ? [] : paginatedItems.map((item) => item.id));
  };

  const handleView = (id: number) => {
    const item = inventory.find(i => i.id === id);
    if (item) {
      setViewingItem(item);
    }
  };

  const handleEdit = (id: number) => {
    const item = inventory.find(i => i.id === id);
    if (item) {
      setEditingItem(item);
    }
  };

  const handleSaveEdit = (updatedItem: any) => {
    setInventory(inventory.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setEditingItem(null);
  };

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setDeletingId(itemToDelete);
      setShowDeleteConfirm(false);
      
      // Simulate delete animation then actually delete
      setTimeout(() => {
        setInventory(inventory.filter(item => item.id !== itemToDelete));
        setSelectedItems(selectedItems.filter(id => id !== itemToDelete));
        setDeletingId(null);
        setItemToDelete(null);
      }, 300);
    }
  };

  const handleBulkDeleteClick = () => {
    if (selectedItems.length > 0) {
      setShowBulkDeleteConfirm(true);
    }
  };

  const confirmBulkDelete = () => {
    setShowBulkDeleteConfirm(false);
    
    // Delete all selected items
    setInventory(inventory.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setShowBulkDeleteConfirm(false);
    setItemToDelete(null);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {/* Page Header with Icon */}
        <div className={styles.pageHeader}>
          <Link href="/" className={styles.backButton}>
            <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <div className={styles.headerCenter}>
            <div className={styles.headerTitleWrapper}>
              <svg className={styles.headerIcon} viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
                <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <h1 className={styles.headerTitle}>Review Donation Inventory</h1>
            </div>
          </div>
          <div className={styles.headerSpacer} />
        </div>

        {/* View Modal */}
        {viewingItem && (
          <ViewModal 
            item={viewingItem} 
            onClose={() => setViewingItem(null)} 
          />
        )}

        {/* Edit Modal */}
        {editingItem && (
          <EditModal 
            item={editingItem} 
            onClose={() => setEditingItem(null)} 
            onSave={handleSaveEdit}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalIcon}>🗑️</div>
              <h3 className={styles.modalTitle}>Delete Item</h3>
              <p className={styles.modalMessage}>Are you sure you want to delete this item? This action cannot be undone.</p>
              <div className={styles.modalActions}>
                <button onClick={cancelDelete} className={styles.modalCancelButton}>
                  Cancel
                </button>
                <button onClick={confirmDelete} className={styles.modalConfirmButton}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Delete Confirmation Modal */}
        {showBulkDeleteConfirm && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalIcon}>🗑️</div>
              <h3 className={styles.modalTitle}>Delete Multiple Items</h3>
              <p className={styles.modalMessage}>
                Are you sure you want to delete {selectedItems.length} selected items? This action cannot be undone.
              </p>
              <div className={styles.modalActions}>
                <button onClick={cancelDelete} className={styles.modalCancelButton}>
                  Cancel
                </button>
                <button onClick={confirmBulkDelete} className={styles.modalConfirmButton}>
                  Delete All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Site</label>
              <select value={selectedSite} onChange={(e) => { setSelectedSite(e.target.value); setCurrentPage(1); }} className={styles.filterSelect}>
                {SITES.map((site) => <option key={site} value={site}>{site}</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Item Category</label>
              <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }} className={styles.filterSelect}>
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Date Range</label>
              <input type="text" placeholder="mm/dd/yyyy" className={styles.filterInput} />
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status</label>
              <select value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }} className={styles.filterSelect}>
                {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className={styles.filterButtonsGroup}>
              <button className={styles.filterButton}>
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z" />
                </svg>
                Export
              </button>
              <button className={`${styles.filterButton} ${styles.filterButtonPrimary}`}>
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Item
              </button>
              {selectedItems.length > 0 && (
                <button 
                  className={`${styles.filterButton} ${styles.filterButtonDelete}`}
                  onClick={handleBulkDeleteClick}
                >
                  <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete Selected ({selectedItems.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <StatCard 
            label="Total Items" 
            value={stats.total.toString()} 
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            } 
          />
          <StatCard 
            label="Available" 
            value={stats.available.toString()} 
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            } 
          />
          <StatCard 
            label="Reserved" 
            value={stats.reserved.toString()} 
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            } 
          />
          <StatCard 
            label="Distributed" 
            value={stats.distributed.toString()} 
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              </svg>
            } 
          />
        </div>

        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Donation Inventory</h2>
            <p className={styles.tableInfo}>
              {selectedItems.length > 0 ? (
                <span className={styles.selectedCount}>{selectedItems.length} selected</span>
              ) : (
                `Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredItems.length)} of ${filteredItems.length} items`
              )}
            </p>
          </div>
          {filteredItems.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.tableHeadCell}>
                      <input 
                        type="checkbox" 
                        className={styles.checkbox} 
                        checked={selectedItems.length === paginatedItems.length && paginatedItems.length > 0} 
                        onChange={handleSelectAll} 
                      />
                    </th>
                    <th className={styles.tableHeadCell}>Items</th>
                    <th className={styles.tableHeadCell}>Sites</th>
                    <th className={styles.tableHeadCell}>Date</th>
                    <th className={styles.tableHeadCell}>Time</th>
                    <th className={styles.tableHeadCell}>Quantity</th>
                    <th className={styles.tableHeadCell}>Status</th>
                    <th className={styles.tableHeadCell}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((item) => (
                    <InventoryRow 
                      key={item.id} 
                      item={item} 
                      selected={selectedItems.includes(item.id)} 
                      onSelect={(id) => setSelectedItems(selectedItems.includes(id) ? selectedItems.filter((i) => i !== id) : [...selectedItems, id])} 
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                      isDeleting={deletingId === item.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No inventory items found matching your criteria.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className={styles.paginationContainer}>
            <p className={styles.paginationInfo}>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} items
            </p>
            <div className={styles.paginationControls}>
              <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={styles.paginationButton}>
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className={styles.paginationPages}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`${styles.pageNumber} ${currentPage === page ? styles.pageNumberActive : ""}`}>
                    {page}
                  </button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={styles.paginationButton}>
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}