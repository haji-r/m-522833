export const formBodyData = async (params) => {
  var bodyFormData = new FormData();
  // bodyFormData.append('key', 'value');

  // console.log(bodyFormData)
  // var bodyFormData = new FormData();
  // bodyFormData.append('username', email);
  // bodyFormData.append('password', password);

  for (const [key, value] of Object.entries(params)) {
    console.log(key, value)
    bodyFormData.append(key, value);

  }  

  return bodyFormData;
}