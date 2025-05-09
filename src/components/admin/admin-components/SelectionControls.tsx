import React from 'react';
import Button from '../../shared/Button';

interface SelectionControlsProps {
  filteredCompanies: any[];
  setSelectAll: (allCompanies: Record<string, boolean>) => void;
  clearSelection: () => void;
  loading: boolean;
}

/**
 * Component for selecting all/none companies
 */
const SelectionControls: React.FC<SelectionControlsProps> = ({
  filteredCompanies,
  setSelectAll,
  clearSelection,
  loading
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          const newAssignments: Record<string, boolean> = {};
          filteredCompanies.forEach(company => {
            newAssignments[company.id] = true;
          });
          setSelectAll(newAssignments);
        }}
        disabled={loading || filteredCompanies.length === 0}
      >
        Select All
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={clearSelection}
        disabled={loading || filteredCompanies.length === 0}
      >
        Clear Selection
      </Button>
    </div>
  );
};

export default React.memo(SelectionControls);