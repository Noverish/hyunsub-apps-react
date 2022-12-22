import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'src/redux';
import { addNumberAction, padNumberAction, renameBulkAction, replaceAction, resetAction } from 'src/pages/drive/rename/DriveRenameContext';
import { Button, Form, InputGroup } from 'react-bootstrap';

import './DriveRenameControl.scss';

type RenameMode = 'replace' | 'add_number' | 'pad_number' | '';

interface Props {

}

interface FormState {
  from: string;
  to: string;
  padNum: string;
  startNum: string;
}

export default function DriveRenameControl(props: Props) {
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
        <Button variant={renameMode === 'replace' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('replace')}>문자열 바꾸기</Button>
        <Button variant={renameMode === 'add_number' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('add_number')}>번호 붙이기</Button>
        <Button variant={renameMode === 'pad_number' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('pad_number')}>자리수 맞추기</Button>
        <Button variant="danger" onClick={reset}>초기화</Button>
        <Button variant="primary" onClick={submit}>실제로 적용하기</Button>
      </div>
      {renameMode === 'replace' && <div className="option">
        <InputGroup className="from">
          <Form.Control {...register('from')} />
          <InputGroup.Text><i className="fas fa-arrow-right"></i></InputGroup.Text>
          <Form.Control {...register('to')} />
        </InputGroup>
        <Button onClick={replace}>바꾸기</Button>
      </div>}
      {renameMode === 'add_number' && <div className="option">
        <InputGroup>
          <InputGroup.Text>시작 숫자</InputGroup.Text>
          <Form.Control type="number" {...register('startNum')} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>자리수</InputGroup.Text>
          <Form.Control type="number" {...register('padNum')} />
        </InputGroup>
        <Button onClick={addNumber(true)}>앞에 붙이기</Button>
        <Button onClick={addNumber(false)}>뒤에 붙이기</Button>
      </div>}
      {renameMode === 'pad_number' && <div className="option">
        <InputGroup>
          <InputGroup.Text>자리수</InputGroup.Text>
          <Form.Control type="number" {...register('padNum')} />
        </InputGroup>
        <Button onClick={padNumber}>맞추기</Button>
      </div>}
    </div>
  )
}
