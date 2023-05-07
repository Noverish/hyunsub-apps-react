import { t } from 'i18next';
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { useDriveRenameAddNumber, useDriveRenameBulk, useDriveRenamePadNumber, useDriveRenameReplace, useDriveRenameReset } from './DriveRenameHooks';

import './DriveRenameControl.scss';

type RenameMode = 'replace' | 'add_number' | 'pad_number' | '';

interface FormState {
  from: string;
  to: string;
  padNum: string;
  startNum: string;
}

export default function DriveRenameControl() {
  const { register, getValues } = useForm<FormState>({
    defaultValues: {
      padNum: '3',
      startNum: '0',
    },
  });
  const [renameMode, setRenameMode] = useState<RenameMode>('');

  const driveRenameReplace = useDriveRenameReplace();
  const driveRenameAddNumber = useDriveRenameAddNumber();
  const driveRenamePadNumber = useDriveRenamePadNumber();
  const driveRenameBulk = useDriveRenameBulk();
  const driveRenameReset = useDriveRenameReset();

  const onModeClick = (mode: RenameMode) => () => {
    if (renameMode === mode) {
      setRenameMode('');
    } else {
      setRenameMode(mode);
    }
  };

  const replace = () => {
    const from = getValues('from');
    const to = getValues('to');
    driveRenameReplace(from, to);
  };

  const addNumber = (front: boolean) => () => {
    const padNum = parseInt(getValues('padNum'));
    const startNum = parseInt(getValues('startNum'));
    driveRenameAddNumber(front, startNum, padNum);
  };

  const padNumber = () => {
    const padNum = parseInt(getValues('padNum'));
    driveRenamePadNumber(padNum);
  };

  const reset = () => {
    driveRenameReset();
  };

  const submit = () => {
    driveRenameBulk();
  };

  return (
    <div className="DriveRenameControl">
      <div className="btn_bar">
        <Button variant={renameMode === 'replace' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('replace')}>
          {t('drive.rename.replace')}
        </Button>
        <Button variant={renameMode === 'add_number' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('add_number')}>
          {t('drive.rename.add-number')}
        </Button>
        <Button variant={renameMode === 'pad_number' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('pad_number')}>
          {t('drive.rename.pad-number')}
        </Button>
        <Button variant="danger" onClick={reset}>
          {t('drive.rename.reset')}
        </Button>
        <Button variant="primary" onClick={submit}>
          {t('drive.rename.apply')}
        </Button>
      </div>
      {renameMode === 'replace' && (
        <div className="option">
          <InputGroup className="from">
            <Form.Control {...register('from')} />
            <InputGroup.Text>
              <i className="fas fa-arrow-right"></i>
            </InputGroup.Text>
            <Form.Control {...register('to')} />
          </InputGroup>
          <Button onClick={replace}>{t('drive.rename.replace.button')}</Button>
        </div>
      )}
      {renameMode === 'add_number' && (
        <div className="option">
          <InputGroup>
            <InputGroup.Text>{t('drive.rename.number.start-number')}</InputGroup.Text>
            <Form.Control type="number" {...register('startNum')} />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>{t('drive.rename.number.digit')}</InputGroup.Text>
            <Form.Control type="number" {...register('padNum')} />
          </InputGroup>
          <Button onClick={addNumber(true)}>{t('drive.rename.add-number.front')}</Button>
          <Button onClick={addNumber(false)}>{t('drive.rename.add-number.back')}</Button>
        </div>
      )}
      {renameMode === 'pad_number' && (
        <div className="option">
          <InputGroup>
            <InputGroup.Text>{t('drive.rename.number.digit')}</InputGroup.Text>
            <Form.Control type="number" {...register('padNum')} />
          </InputGroup>
          <Button onClick={padNumber}>{t('drive.rename.pad-number.button')}</Button>
        </div>
      )}
    </div>
  );
}
