export const useGetQuery = async (offset,limit,access_token,token_type) => {

   const res =  await fetch(`http://79.143.31.216/statistics?order=desc_short&offset=${offset}&limit=${limit}`, {
           
             
              headers: {
                  accept: 'application/json' ,
                  Authorization: `${token_type} ${access_token}`
              }
             
      })
    
    
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status:${res.status}`);
      }
    
      return  res.json();
    }
    

  