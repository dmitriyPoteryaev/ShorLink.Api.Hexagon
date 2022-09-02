


export const usePostQuery = (username,password) => {

return fetch(`http://79.143.31.216/register?username=${username}&password=${password}`, {
    method: 'POST',
     accept: 'application/json'
}).then(function(response) {
    // Стоит проверить код ответа.
    // if (!response.ok) {
    //     // Сервер вернул код ответа за границами диапазона [200, 299]
    //     return Promise.reject(new Error(
    //         'Response failed: ' + response.status + ' (' + response.statusText + ')'
    //     ));
    // }

    // console.log()
    // Далее будем использовать только JSON из тела ответа.
    return response;
})
// .then(function(data) {
//     return data
//  }).catch(function(error) {
//     return error
//  });



}