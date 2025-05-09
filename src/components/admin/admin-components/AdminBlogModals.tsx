import React from 'react';
import AddBlogPostModal from '../AddBlogPostModal';
import EditBlogPostModal from '../EditBlogPostModal';
import type { BlogPost } from '../../../types/blog';

interface AdminBlogModalsProps {
  showAddModal: boolean;
  showEditModal: boolean;
  editingPost: BlogPost | null;
  onCloseAddModal: () => void;
  onCloseEditModal: () => void;
  onSuccess: () => void;
  onSubmit: () => Promise<void>;
}

/**
 * Component that manages blog post modals (add and edit)
 */
const AdminBlogModals: React.FC<AdminBlogModalsProps> = ({
  showAddModal,
  showEditModal,
  editingPost,
  onCloseAddModal,
  onCloseEditModal,
  onSuccess,
  onSubmit
}) => {
  return (
    <>
      <AddBlogPostModal
        show={showAddModal}
        onClose={onCloseAddModal}
        onSuccess={onSuccess}
      />

      {editingPost && (
        <EditBlogPostModal
          show={showEditModal}
          onClose={onCloseEditModal}
          onSubmit={onSubmit}
          post={editingPost}
        />
      )}
    </>
  );
};

export default React.memo(AdminBlogModals);