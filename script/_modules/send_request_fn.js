const sendingRequest = async (url, method, body = null) => {
   return fetch(url, {
      method,
      headers: {
         'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
   }).then(response => {
      if (response.ok) {
         return response.json();
      }
      return console.log(response.json());
   });
}

export { sendingRequest };