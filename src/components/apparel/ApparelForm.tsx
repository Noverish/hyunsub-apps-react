import { Dispatch } from "@reduxjs/toolkit";
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { deleteApparelDetailImageCache } from "src/api/apparel/apparel-detail";
import apparelImageDelete from "src/api/apparel/apparel-image-delete";
import { Apparel, ApparelImage } from "src/model/apparel";
import { useDispatch } from "src/redux";
import { GlobalActions } from 'src/redux/global';
import { ExtendedImage } from "../common/ExtendedImage";
import ImageAddButton from "../common/ImageAddButton";

interface Props {
  apparel?: Apparel;
  onImageAdd?: (images: File[]) => void;
  onSubmit: (apparel: Apparel) => void;
  confirmBtnText: string;
}

export const apparelImageDeleteAction = (image: ApparelImage) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));
  await apparelImageDelete(image);
  deleteApparelDetailImageCache(image);
  dispatch(GlobalActions.update({ loading: false }));
}

export function ApparelFormImage({ image }: { image: ApparelImage }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(apparelImageDeleteAction(image));
  }

  return (
    <div className="col">
      <div className="ratio ratio-1x1">
        <ExtendedImage className="img-fluid" src={image.url} loading="lazy" alt={image.imageId} onDelete={onDelete} />
      </div>
    </div>
  )
}

export default function ApparelForm(props: Props) {
  const { apparel, onImageAdd, onSubmit, confirmBtnText } = props;
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<Apparel>({ defaultValues: apparel });

  const images = (apparel?.images || []).map((v) => <ApparelFormImage image={v} key={v.imageId} />);

  return (
    <div id="ApparelForm">
      <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4">
        {images}
        <div className="col">
          <div className="ratio ratio-1x1">
            <ImageAddButton callback={onImageAdd} multiple={true} />
          </div>
        </div>
      </div>
      <Form className="mt-3 d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>{t('apparel.term.name')}</Form.Label>
          <Form.Control {...register('name')} className="input_dark" />
        </Form.Group>

        <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.itemNo')}</Form.Label>
            <Form.Control {...register('itemNo')} className="input_dark" />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.brand')}</Form.Label>
            <Form.Control {...register('brand')} className="input_dark" />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.type')}</Form.Label>
            <Form.Control {...register('type')} className="input_dark" />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.size')}</Form.Label>
            <Form.Control {...register('size')} className="input_dark" />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.color')}</Form.Label>
            <Form.Control {...register('color')} className="input_dark" />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.originPrice')}</Form.Label>
            <Form.Control type="number" {...register('originPrice')} className="input_dark" />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.discountPrice')}</Form.Label>
            <Form.Control type="number" {...register('discountPrice')} className="input_dark" />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.buyDt')}</Form.Label>
            <Form.Control {...register('buyDt')} className="input_dark" />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.buyLoc')}</Form.Label>
            <Form.Control {...register('buyLoc')} className="input_dark" />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>{t('apparel.term.makeDt')}</Form.Label>
            <Form.Control {...register('makeDt')} className="input_dark" />
          </Form.Group>
        </div>

        <Form.Group className="col">
          <Form.Label>{t('apparel.term.material')}</Form.Label>
          <Form.Control {...register('material')} className="input_dark" />
        </Form.Group>

        <Form.Group className="col">
          <Form.Label>{t('apparel.term.size2')}</Form.Label>
          <Form.Control {...register('size2')} className="input_dark" />
        </Form.Group>

        <div>
          <Button variant="primary" type="submit">{confirmBtnText}</Button>
        </div>
      </Form>
    </div>
  )
}
