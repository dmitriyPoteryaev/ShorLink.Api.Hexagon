




    export const usePostLink = (url,token_type,access_token) => {

        return fetch(`http://79.143.31.216/squeeze?link=${url}`, {
            method: 'POST',
            headers: {
                accept: 'application/json' ,
                Authorization: `${token_type} ${access_token}`
            },
        }).then(function(response) {
            // Стоит проверить код ответа.
            if (!response.ok) {
                // Сервер вернул код ответа за границами диапазона [200, 299]
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.statusText + ')'
                ));
            }
        
            // console.log()
            // Далее будем использовать только JSON из тела ответа.
            return response.json();
        })
        
        
        
        
        }