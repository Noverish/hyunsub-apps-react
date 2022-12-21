import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import driveListApi from 'src/api/drive/drive-list';
import { CommonSuspenseFallback } from 'src/components/common/CommonSuspense';
import DriveContainer from 'src/components/drive/DriveContainer';
import DriveFileList from 'src/components/drive/DriveFileList';
import DriveHeader from 'src/components/drive/DriveHeader';
import { useDispatch, useSelector } from 'src/redux';
import { usePath } from '../DriveHooks';
import { DriveActions } from '../DriveRedux';
import { addNumberAction, padNumberAction, replaceAction, resetAction } from './DriveRenameContext';

import './DriveRenamePage.scss';

type RenameMode = 'replace' | 'add_number' | 'pad_number' | '';

interface FormState {
  from: string;
  to: string;
  padNum: string;
  startNum: string;
}

export default function DriveRenamePage() {
  const dispatch = useDispatch();
  const { register, getValues } = useForm<FormState>({
    defaultValues: {
      padNum: '3',
      startNum: '0',
    }
  });
  const [renameMode, setRenameMode] = useState<RenameMode>('');

  const replace = () => {
    const from = getValues('from');
    const to = getValues('to');
    dispatch(replaceAction(from, to));
  }

  const reset = () => {
    dispatch(resetAction());
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

  const onModeClick = (mode: RenameMode) => () => {
    if (renameMode === mode) {
      setRenameMode('');
    } else {
      setRenameMode(mode);
    }
  }

  return (
    <div id="DriveRenamePage">
      <DriveHeader title="Drive" />
      <DriveContainer>
        <div className="drive_container_content">
          <div id="btn_bar" className="p-2 border-bottom">
            <div className="d-flex gap-2">
              <Button variant={renameMode === 'replace' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('replace')}>문자열 바꾸기</Button>
              <Button variant={renameMode === 'add_number' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('add_number')}>번호 붙이기</Button>
              <Button variant={renameMode === 'pad_number' ? 'secondary' : 'outline-secondary'} onClick={onModeClick('pad_number')}>자리수 맞추기</Button>
              <Button variant="danger" onClick={reset}>초기화</Button>
              <Button variant="primary">실제로 적용하기</Button>
            </div>
            {renameMode === 'replace' && <div className="mt-2 option">
              <InputGroup className="from">
                <Form.Control {...register('from')} />
                <InputGroup.Text><i className="fas fa-arrow-right"></i></InputGroup.Text>
                <Form.Control {...register('to')} />
              </InputGroup>
              <Button onClick={replace}>바꾸기</Button>
            </div>}
            {renameMode === 'add_number' && <div className="mt-2 option">
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
            {renameMode === 'pad_number' && <div className="mt-2 option">
              <InputGroup>
                <InputGroup.Text>자리수</InputGroup.Text>
                <Form.Control type="number" {...register('padNum')} />
              </InputGroup>
              <Button onClick={padNumber}>맞추기</Button>
            </div>}
          </div>
          <FileListSection />
        </div>
      </DriveContainer>
    </div>
  )
}

function FileListSection() {
  const dispatch = useDispatch();
  const [path] = usePath();
  const { data: prevList } = driveListApi.useApiResult({ path });
  const { renames: nextList } = useSelector(s => s.drive);
  const parent = path !== '/';

  useEffect(() => {
    dispatch(DriveActions.update({ renames: prevList }));
  }, [prevList]);

  return (
    <div id="file_list">
      <div className="drive_two_column">
        {prevList ? <DriveFileList files={prevList} parent={parent} /> : <CommonSuspenseFallback />}
        {prevList ? <DriveFileList files={nextList} parent={parent} /> : <CommonSuspenseFallback />}
      </div>
    </div>
  )
}
