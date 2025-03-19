export const formBodyData = async (params) => {
  var bodyFormData = new FormData();
  for (const [key, value] of Object.entries(params)) {
    bodyFormData.append(key, value);
  }  

  return bodyFormData;
}