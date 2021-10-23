import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import {
  membersSelector,
  getMember,
  getSelectedMember,
} from '../../redux/membersSlice';
import MemberUpdateForm from '../members/MemberUpdateForm';
import {
  setIsOpenDeleteModal,
  setIsOpenUpdateForm,
} from '../../redux/commonSlice';

import './memberList.css';
import DeleteModal from './DeleteModal';

interface MemberWithId {
  name: string;
  phone: string;
  email: string;
  address: string;
  _id: string;
}

const Index = () => {
  const members = useSelector(membersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMember());
  }, []);

  const removeUesr = (user: MemberWithId) => {
    dispatch(getSelectedMember(user));
    dispatch(setIsOpenDeleteModal(true));
  };

  const updateUser = (user: MemberWithId) => {
    dispatch(getSelectedMember(user));
    dispatch(setIsOpenUpdateForm(true));
  };

  return (
    <div className="list--container">
      <DeleteModal />
      <MemberUpdateForm />
      <h1>Members</h1>

      <div>
        {members.map((member: MemberWithId, indx: number) => (
          <div key={indx} className="item__wrapper">
            <div className="item__content">
              <div className="item__text">
                <div>
                  <span className="item__text--name">Name :</span>{' '}
                  {member?.name}
                </div>
                <div>
                  <span>Email :</span> {member?.email}
                </div>
              </div>
              <div className="item__text">
                <div>
                  <span>Phone :</span> {member.phone}
                </div>
                <div>
                  {' '}
                  <span>Address :</span> {member.address}
                </div>
              </div>
            </div>
            <div className="btn__contain">
              <Button
                color="secondary"
                className="update--btn"
                onClick={() => updateUser(member)}
              >
                Edit
              </Button>
              <Button
                color="danger"
                className="item__remove-btn"
                onClick={() => removeUesr(member)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
