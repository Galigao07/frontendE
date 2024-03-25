
// export let globalDate: string;
// export let globalTime: string;

import showSuccessAlert from "./SwalMessage/ShowSuccessAlert";
import axios from "axios";
import BASE_URL from "./config";
import showErrorAlert from "./SwalMessage/ShowErrorAlert";

// export enum PaymentMethod {
//     CASH = 116,
//     CHECKS = 113,
//     CREDIT_CARDS = 112,
//     DEBIT_CARDS = 111,
//     CHARGES_PO = 114,
//     GIFT_CHECKS = 117,
//     OTHER_PAYMENT = 118,
//     CREDIT_SALES = 119,
//   }
export async function getWaiterName(id: any) {
  try {
    // Assuming you're fetching the waiter name from some API
    const response = await axios.get(`${BASE_URL}/api/waiter_name/`,{
      params: {
        id:id
      }
    });
if (response.status == 200){
  const data = await response.data;
  return data.waiter_name; // Assuming the response contains the waiter's name
}

  } catch (error) {
    showErrorAlert('Error while Fetching Waiter name');
    // Handle error appropriately, you might want to log the error
    return null; // or throw error depending on your use case
  }
}

export async function GetAccountTitle(str:any) {
  try {
    // Assuming you're fetching the waiter name from some API
    const response = await axios.get(`${BASE_URL}/api/account-title/`,{
      params: {
        account_title:str
      }
    });
if (response.status == 200){
  const data = await response.data;
  return data; // Assuming the response contains the waiter's name
}

  } catch (error) {
    showErrorAlert('Error while Fetching Waiter name');
    // Handle error appropriately, you might want to log the error
    return null; // or throw error depending on your use case
  }
}


export async function GetSLAccount(str:any) {
  try {
    // Assuming you're fetching the waiter name from some API
    const response = await axios.get(`${BASE_URL}/api/sl-account/`,{
      params: {
        sl_acct:str
      }
    });
if (response.status == 200){
  const data = await response.data;
  return data; // Assuming the response contains the waiter's name
}

  } catch (error) {
    showErrorAlert('Error while Fetching Waiter name');
    // Handle error appropriately, you might want to log the error
    return null; // or throw error depending on your use case
  }
}