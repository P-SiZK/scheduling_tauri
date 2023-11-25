import { ShiftTypeEditor as ShiftTypeEditorComponent } from './components/shiftTypeEditor';
import useShiftTypeEditor from './hooks/useShiftTypeEditor';

export default function ShiftTypeEditor() {
  const {
    shiftTypes,
    insertShiftType,
    updateShiftType,
    deleteShiftType,
  } = useShiftTypeEditor();

  return (
    <ShiftTypeEditorComponent
      shiftTypes={shiftTypes}
      handleInsertShiftType={insertShiftType}
      handleUpdateShiftType={updateShiftType}
      handleDeleteShiftType={deleteShiftType}
    />
  );
}
