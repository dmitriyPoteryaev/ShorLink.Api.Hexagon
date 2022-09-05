export const useSortingContent=(somethingContent,filterSelector)=>{

 


    
    return  [...somethingContent].sort(
        (a, b) => b[filterSelector] - a[filterSelector]
      )
    


 
 
}