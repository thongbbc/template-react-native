
import SmsAndroid from 'react-native-sms-android';
const sendSms = (phone: string, body: string) => {
  return new Promise((resolve, reject) => {
    SmsAndroid.sms(
      phone, // phone number to send sms to
      body, // sms body
      'sendDirect', // sendDirect or sendIndirect
      (err: any, message: any) => {
        if (err){
          reject()
        } else {
          resolve()
        }
      }
    );
  })
}

export {sendSms}