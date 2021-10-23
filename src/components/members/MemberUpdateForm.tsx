import React, { useEffect } from 'react';
import { Button, Modal } from 'reactstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { isOpenUpdateForm, setIsOpenUpdateForm } from '../../redux/commonSlice';
import {
  selectedMemberSelector,
  updateMemberSlice,
} from '../../redux/membersSlice';

interface IFormInputs {
  name: string;
  phone: string;
  email: string;
  address: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required(),
    address: yup.string().required(),
  })
  .required();

const MemberUpdateForm: React.FC = () => {
  const updateMember = useSelector(selectedMemberSelector);
  const openUdpateForm = useSelector(isOpenUpdateForm);
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const handleOutSiteClick = () => {
    dispatch(setIsOpenUpdateForm(false));
  };

  const onSubmit = (data: IFormInputs) => {
    dispatch(updateMemberSlice({ ...data, _id: updateMember._id }));
    dispatch(setIsOpenUpdateForm(false));
  };
  useEffect(() => reset(), [updateMember]);

  return (
    <>
      <Modal isOpen={openUdpateForm} toggle={handleOutSiteClick} centered>
        <h3 className="p-3 d-flex justify-content-center align-items-center">
          Update Member
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="form-group">
            <label>Name: </label>
            <input
              {...register('name')}
              className="form-control"
              placeholder="Name"
              defaultValue={updateMember.name}
            />
            <p className="text-danger pt-1">{errors.name?.message}</p>
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              {...register('phone')}
              className="form-control"
              placeholder="Phone"
              defaultValue={updateMember.phone}
            />
            <p className="text-danger pt-1">{errors.phone?.message}</p>
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              {...register('email')}
              className="form-control"
              placeholder="Email"
              defaultValue={updateMember.email}
            />
            <p className="text-danger pt-1">{errors.email?.message}</p>
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              {...register('address')}
              className="form-control"
              placeholder="Address"
              defaultValue={updateMember.address}
            />
            <p className="text-danger pt-1">{errors.address?.message}</p>
          </div>
          {/* <div className="d-flex align-items-center"> */}
          <Button type="submit">Update Member</Button>
          {/* </div> */}
        </form>
      </Modal>
    </>
  );
};

export default MemberUpdateForm;
