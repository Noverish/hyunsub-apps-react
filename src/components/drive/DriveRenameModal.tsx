import { basename, dirname } from 'path-browserify';
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DriveActions } from "src/pages/drive/DriveRedux";
import { driveRenameAction } from 'src/pages/drive/explorer/DriveExplorerActions';
import { useDispatch, useSelector } from "src/redux";

interface FormState {
  name: string;
}

export default function DriveRenameModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameModalPath } = useSelector(s => s.drive);
  const { register, getValues, setValue } = useForm<FormState>();

  const folderPath = renameModalPath ? dirname(renameModalPath) : '';
  const fileName = renameModalPath ? basename(renameModalPath) : '';

  useEffect(() => {
    setValue('name', fileName);
  }, [setValue, fileName]);

  const onHide = () => {
    dispatch(DriveActions.update({ renameModalPath: undefined }));
  }

  const onConfirm = () => {
    const newName = getValues('name');
    dispatch(driveRenameAction(folderPath, fileName, newName));
    onHide();
  }

  return (
    <Modal className="DriveRenameModal" show={renameModalPath !== undefined} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('drive.DriveRenameModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>{t('drive.DriveRenameModal.label')}</Form.Label>
          <Form.Control {...register('name')} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>{t('drive.DriveRenameModal.button')}</Button>
      </Modal.Footer>
    </Modal>
  )
}
