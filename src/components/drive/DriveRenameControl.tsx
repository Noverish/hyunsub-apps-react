import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'src/redux';
import { addNumberAction, padNumberAction, renameBulkAction, replaceAction, resetAction } from 'src/pages/drive/rename/DriveRenameActions';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import './DriveRenameControl.scss';

type RenameMode = 'replace' | 'add_number' | 'pad_number' | '';

interface FormState {
  from: string;
  to: string;
  padNum: string;
  startNum: string;
}

export default function DriveRenameControl() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, getValues } = useForm<FormState>({
    defaultValues: {
      padNum: '3',
      startNum: '0',
    }
  });
  const [renameMode, setRenameMode] = useState<RenameMode>('');

  const onModeClick = (mode: RenameMode) => () => {
    if (renameMode === mode) {
      setRenameMode('');
    } else {
      setRenameMode(mode);
    }
  }

  const replace = () => {
    const from = getValues('from');
    const to = getValues('to');
    dispatch(replaceAction(from, to));
  }

  const addNumber = (front: boolean) => () => {
    const padNum = parseInt(getValues('padNum'));
    const startNum = parseInt(getValues('startNum'));
    dispatch(addNumberAction(front, startNum, padNum));
  }

  const padNumber = () => {
    const padNum = parseInt(getValues('padNum'));
    dispatch(padNumberAction(padNum));
  }

  const reset = () => {
    dispatch(resetAction());
  }

  const submit = () => {
    dispatch(renameBulkAction());
  }

  return (
    <div className="DriveRenameControl">
      <div className="btn_bar">
        <Button variant={renameMode === 'replace' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('replace')}>{t('drive.rename.replace')}</Button>
        <Button variant={renameMode === 'add_number' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('add_number')}>{t('drive.rename.add-number')}</Button>
        <Button variant={renameMode === 'pad_number' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('pad_number')}>{t('drive.rename.pad-number')}</Button>
        <Button variant="danger" onClick={reset}>{t('drive.rename.reset')}</Button>
        <Button variant="primary" onClick={submit}>{t('drive.rename.apply')}</Button>
      </div>
      {renameMode === 'replace' && <div className="option">
        <InputGroup className="from">
          <Form.Control {...register('from')} />
          <InputGroup.Text><i className="fas fa-arrow-right"></i></InputGroup.Text>
          <Form.Control {...register('to')} />
        </InputGroup>
        <Button onClick={replace}>{t('drive.rename.replace.button')}</Button>
      </div>}
      {renameMode === 'add_number' && <div className="option">
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
      </div>}
      {renameMode === 'pad_number' && <div className="option">
        <InputGroup>
          <InputGroup.Text>{t('drive.rename.number.digit')}</InputGroup.Text>
          <Form.Control type="number" {...register('padNum')} />
        </InputGroup>
        <Button onClick={padNumber}>{t('drive.rename.pad-number.button')}</Button>
      </div>}
    </div>
  )
}
