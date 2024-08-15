import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {IUserToEdit} from "@/types/IUser";
import {editUserAction} from "@/common/store/user/user.slice";


const userInit: IUserToEdit = {
  _id: "",
  email: "",
  phoneNumber: "",
  password: "",
  isAdmin: false,
  name: "",
  surname: "",
  city: "",
  street: "",
  house: "",
  apartment: "",
  postalCode: "",
  novaPoshtaBranch: "",
  meestBranch: "",
}


const UserForm = () => {
  const {currentUser} = useAppSelector(state => state.rootReducer.user)
  const [user, setUser] = useState(userInit)
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (currentUser)

      setUser({
        ...user,
        _id: currentUser._id as string,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber ?? "",
        name: currentUser.name ?? "",
        surname: currentUser.surname ?? "",
        city: currentUser.city ?? "",
        street: currentUser.street ?? "",
        house: currentUser.house ?? "",
        apartment: currentUser.apartment ?? "",
        postalCode: currentUser.postalCode ?? "",
        novaPoshtaBranch: currentUser.novaPoshtaBranch ?? "",
        meestBranch: currentUser.meestBranch ?? "",
      })
  }, [currentUser]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setUser(prevState => ({...prevState, name: e.target.value}))
  }
  const handleSurNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      prevState => ({
        ...prevState,
        surname: e.target.value
      }))
  }
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      prevState => ({
        ...prevState,
        phoneNumber: e.target.value
      }))
  }
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      prevState => ({
        ...prevState,
        city: e.target.value
      }))
  }

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      prevState => ({
        ...prevState,
        street: e.target.value
      }))
  }
  const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      prevState => ({
        ...prevState,
        house: e.target.value
      }))
  }
  const handleApartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      prevState => ({
        ...prevState,
        apartment: e.target.value
      }))
  }

  const handleNPBranchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      prevState => ({
        ...prevState,
        novaPoshtaBranch: e.target.value
      }))
  }
  const handleMeestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      prevState => ({
        ...prevState,
        meestBranch: e.target.value
      }))
  }
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(
      prevState => ({
        ...prevState,
        postalCode: e.target.value
      }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(editUserAction(user))
  }

  if (!currentUser)
    return <div>Unauthorized</div>

  return (
    <form onSubmit={handleSubmit} className={'orderForm'}>
      <h2>User Editing</h2>

      <div className={'formGroup'}>
        <label htmlFor="recipientName">Name</label>
        <input value={user.name} onChange={handleNameChange} type="text" id="recipientName" name="recipientName"
               required/>
      </div>

      <div className={'formGroup'}>
        <label htmlFor="recipientSurname">Surname</label>
        <input value={user.surname} onChange={handleSurNameChange} type="text" id="recipientSurname"
               name="recipientSurname" required/>
      </div>

      <div className={'formGroup'}>
        <label htmlFor="phoneNumber">Phone</label>
        <input value={user.phoneNumber} onChange={handlePhoneNumberChange} type="text" id="phoneNumber"
               name="phoneNumber" required/>
      </div>

      <div className={'formGroup'}>
        <label htmlFor="recipientCity">City</label>
        <input value={user.city} onChange={handleCityChange} type="text" id="recipientCity" name="recipientCity"
               required/>
      </div>

      <div className={'formGroup'}>
        <label htmlFor="recipientStreet">Street</label>
        <input value={user.street} onChange={handleStreetChange} type="text" id="recipientStreet" name="recipientStreet"
               required/>
      </div>
      <div className={'formGroup'}>
        <label htmlFor="recipientHouse">House</label>
        <input value={user.house} onChange={handleHouseChange} type="text" id="recipientHouse" name="recipientHouse"
               required/>
      </div>
      <div className={'formGroup'}>
        <label htmlFor="recipientApartment">Apartment</label>
        <input value={user.apartment} onChange={handleApartmentChange} type="text" id="recipientApartment"
               name="recipientApartment" required/>
      </div>
      <div className={'formGroup'}>
        <label htmlFor="recipientPostalCode">Post Index</label>
        <input value={user.postalCode} onChange={handlePostalCodeChange} type="text" id="recipientPostalCode"
               name="recipientPostalCode" required/>
      </div>
      <div className={'formGroup'}>
        <label htmlFor="recipientNovaPoshtaBranch">Nova Post Branch</label>
        <input value={user.novaPoshtaBranch} onChange={handleNPBranchChange} type="text" id="recipientNovaPoshtaBranch"
               name="recipientNovaPoshtaBranch" required/>
      </div>
      <div className={'formGroup'}>
        <label htmlFor="recipientMeestBranch">Meest Branch</label>
        <input value={user.meestBranch} onChange={handleMeestChange} type="text" id="recipientMeestBranch"
               name="recipientMeestBranch" required/>
      </div>


      <button type="submit">To order</button>
    </form>
  );
};

export default UserForm;