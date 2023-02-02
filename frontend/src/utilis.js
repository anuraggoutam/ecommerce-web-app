export const geterror = (error) => {
    return error.response && error.response.data.message ? 
    error.response.data.message : error.message 
    
}

///this will give you full error