
import SmsAndroid from 'react-native-sms-android';

function byteLength(str: string) {
  // returns the byte length of an utf8 string
  var s = str.length;
  for (var i=str.length-1; i>=0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s+=2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
  }
  return s;
}

const sendSms = (phone: string, body: string) => {
  return new Promise((resolve, reject) => {
    if (byteLength(body) > 140) {
      throw new Error('error')
    }
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