import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Navbar, NavbarBrand } from 'reactstrap';
import { setIsOpenMemberForm } from '../../redux/commonSlice';
import './navbar.css';

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const setOpenMemberForm = () => {
    dispatch(setIsOpenMemberForm(true));
  };
  return (
    <div className="nav__wrapper">
      <Navbar
        color="dark"
        expand="md"
        className="d-flex justify-content-between p-4"
      >
        <div />
        <NavbarBrand className="nav__text">Club Management System</NavbarBrand>
        <Button onClick={setOpenMemberForm}>
          <span>+</span> Member
        </Button>
      </Navbar>
    </div>
  );
};

export default Index;
