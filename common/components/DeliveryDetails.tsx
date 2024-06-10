import React from 'react';
import {IOrderToCreate} from "@/types/IOrder";

interface IDeliveryDetailsProps {
  setOrder: React.Dispatch<React.SetStateAction<IOrderToCreate>>
  order: IOrderToCreate
}

const DeliveryDetails: React.FC<IDeliveryDetailsProps> = ({ order, setOrder }) => {

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        recipientStreet: e.target.value
      }))
  }
  const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        recipientHouse: e.target.value
      }))
  }
  const handleApartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        recipientApartment: e.target.value
      }))
  }
  const handleNPBranchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        recipientNovaPoshtaBranch: e.target.value
      }))
  }
  const handleMeestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        recipientMeestBranch: e.target.value
      }))
  }
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(
      prevState => ({
        ...prevState,
        recipientPostalCode: e.target.value
      }))
  }


  return (
    <div className={'deliveryDetails'}>
      {order.deliveryMethod === 'courier' && (
        <>
          <div className={'formGroup'}>
            <label htmlFor="recipientStreet">Street</label>
            <input value={order.recipientStreet} onChange={handleStreetChange} type="text" id="recipientStreet" name="recipientStreet" required />
          </div>
          <div className={'formGroup'}>
            <label htmlFor="recipientHouse">House</label>
            <input value={order.recipientHouse} onChange={handleHouseChange} type="text" id="recipientHouse" name="recipientHouse" required />
          </div>
          <div className={'formGroup'}>
            <label htmlFor="recipientApartment">Apartment</label>
            <input value={order.recipientApartment} onChange={handleApartmentChange} type="text" id="recipientApartment" name="recipientApartment" required />
          </div>
        </>
      )}

      {order.deliveryMethod === 'post' && (
        <>
          {order.postalService === 'nova_poshta' && (
            <div className={'formGroup'}>
              <label htmlFor="recipientNovaPoshtaBranch">Nova Post Branch</label>
              <input value={order.recipientNovaPoshtaBranch} onChange={handleNPBranchChange} type="text" id="recipientNovaPoshtaBranch" name="recipientNovaPoshtaBranch" required />
            </div>
          )}

          {order.postalService === 'meest' && (
            <div className={'formGroup'}>
              <label htmlFor="recipientMeestBranch">Meest Branch</label>
              <input value={order.recipientMeestBranch} onChange={handleMeestChange} type="text" id="recipientMeestBranch" name="recipientMeestBranch" required />
            </div>
          )}

          {order.postalService === 'ukrposhta' && (
            <>
              <div className={'formGroup'}>
                <label htmlFor="recipientStreet">Street</label>
                <input value={order.recipientStreet} onChange={handleStreetChange} type="text" id="recipientStreet" name="recipientStreet" required />
              </div>
              <div className={'formGroup'}>
                <label htmlFor="recipientHouse">House</label>
                <input value={order.recipientHouse} onChange={handleHouseChange} type="text" id="recipientHouse" name="recipientHouse" required />
              </div>
              <div className={'formGroup'}>
                <label htmlFor="recipientApartment">Apartment</label>
                <input value={order.recipientApartment} onChange={handleApartmentChange} type="text" id="recipientApartment" name="recipientApartment" required/>
              </div>
              <div className={'formGroup'}>
                <label htmlFor="recipientPostalCode">Post Index</label>
                <input value={order.recipientPostalCode} onChange={handlePostalCodeChange} type="text" id="recipientPostalCode" name="recipientPostalCode" required />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DeliveryDetails;