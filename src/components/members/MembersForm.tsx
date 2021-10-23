import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Modal } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { isOpenMemberForm, setIsOpenMemberForm } from '../../redux/commonSlice';
import { addMember } from '../../redux/membersSlice';

interface IFormInputs {
  name: string;
  phone: string;
  email: string;
  address: string;
  image: any;
}

const schema = yup
  .object({
    name: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required(),
    address: yup.string().required(),
  })
  .required();

const MembersForm: React.FC = () => {
  const commonState = useSelector(isOpenMemberForm);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const handleOutSiteClick = () => {
    dispatch(setIsOpenMemberForm(false));
  };

  const onSubmit = (data: IFormInputs) => {
    dispatch(addMember({ ...data }));
    dispatch(setIsOpenMemberForm(false));
  };

  return (
    <>
      <Modal isOpen={commonState} toggle={handleOutSiteClick} centered>
        <h3 className="p-3 d-flex justify-content-center align-items-center">
          Create Member{' '}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="form-group">
            <label>Name:</label>
            <input
              {...register('name')}
              className="form-control"
              placeholder="Name"
            />
            <p className="text-danger pt-1">{errors.name?.message}</p>
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              {...register('phone')}
              className="form-control"
              placeholder="Phone"
            />
            <p className="text-danger pt-1">{errors.phone?.message}</p>
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              {...register('email')}
              className="form-control"
              placeholder="Email"
            />
            <p className="text-danger pt-1">{errors.email?.message}</p>
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              {...register('address')}
              className="form-control"
              placeholder="Address"
            />
            <p className="text-danger pt-1">{errors.address?.message}</p>
          </div>

          <Button type="submit">Add Member</Button>
        </form>
      </Modal>
    </>
  );
};

export default MembersForm;
