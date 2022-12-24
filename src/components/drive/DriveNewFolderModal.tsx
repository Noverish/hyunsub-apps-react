import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { driveNewFolderAction } from "src/pages/drive/DriveActions";
import { DriveActions } from "src/pages/drive/DriveRedux";
import { useDispatch, useSelector } from "src/redux";

interface FormState {
  name: string;
}

export default function DriveNewFolderModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { newFolderModalIndex } = useSelector(s => s.drive);
  const { register, getValues } = useForm<FormState>();

  const onHide = () => {
    dispatch(DriveActions.update({ newFolderModalIndex: undefined }));
  }

  const onConfirm = () => {
    if (newFolderModalIndex !== undefined) {
      const name = getValues('name');
      dispatch(driveNewFolderAction(newFolderModalIndex, name));
    }
    onHide();
  }

  return (
    <Modal className="DriveNewFolderModal" show={newFolderModalIndex !== undefined} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('drive.DriveNewFolderModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>{t('drive.DriveNewFolderModal.label')}</Form.Label>
          <Form.Control {...register('name')}/>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>{t('drive.DriveNewFolderModal.button')}</Button>
      </Modal.Footer>
    </Modal>
  )
}
